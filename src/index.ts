type State = 'pending' | 'fulfilled' | 'rejected'
type Executor<T=unknown> = (resolve?: (value: T) => void, reject?: (reason?: any) => void) => void

type OnFulfilled<T=unknown> = (value: T) => void
type OnRejected = (reason: any) => void

type Handler = {
  onFulfilled: OnFulfilled,
  onRejected: OnRejected,
}

const isFunction = (value: any) => typeof value === 'function'
const curry = (fn: Function, arg1: any) => (arg2: any) => fn(arg1, arg2)

const getThen = (value: any): Function | null => {
  if (value && (typeof value === 'object' || typeof value === 'function')) {
    // 2.3.3.1 Let then be x.then
    const then = value.then
    if (typeof then === 'function') {
      return then
    }
  }
  return null
}

function doResolve(fn: Executor, onFulfilled: OnFulfilled, onRejected: OnRejected) {
  let done = false
  try {
    fn((result) => {
      if (done) return;
      done = true
      setTimeout(() => onFulfilled(result), 0);
    }, (reason) => {
      if (done) return;
      done = true
      setTimeout(() => onRejected(reason), 0);
    })
  } catch (error) {
    if (done) return;
    done = true
    setTimeout(() => onRejected(error), 0);
  }
}

function resolve<T=unknown>(promise: MyPromise<T>, result: T) {
  try {
    const then = getThen(result)
    if (then) {
      doResolve((onFulfilled, onRejected) => then.call(result, onFulfilled, onRejected), curry(resolve, promise), curry(reject, promise))
      return
    }
    fulfilled(promise, result)
  } catch (error) {
    reject(promise, error)
  }
}

function fulfilled<T=unknown>(promise: MyPromise<T>, value: T) {
  promise.state = 'fulfilled'
  promise.value = value;
  finale(promise)
}

function reject<T=unknown>(promise: MyPromise<T>, reason: any) {
  promise.state = 'rejected'
  promise.value = reason
  finale(promise)
}

function finale<T=unknown>(promise: MyPromise<T>) {
  if (promise.handlers !== null) {
    promise.handlers.forEach(handler => handle(promise, handler))
    promise.handlers = null
  }
}

function handle<T=unknown>(promise: MyPromise<T>, handler: Handler) {
  const { state, value, handlers } = promise
  switch (state) {
    case 'pending':
      handlers.push(handler)
      return
    case 'fulfilled':
      isFunction(handler.onFulfilled) && handler.onFulfilled(value)
      return
    case 'rejected':
      isFunction(handler.onRejected) && handler.onRejected(value)
      return
  }
  
}

class MyPromise<T=unknown> {

  state: State
  value: T | null
  handlers: Handler[] | null

  constructor(handler: Executor<T>) {
    this.state = 'pending'
    this.value = null
    this.handlers = []
    doResolve(handler, curry(resolve, this), curry(reject, this))
  }

  then(onFulfilled?: Function, onRejected?: Function) {
    const self = this
    const nextPromise = new MyPromise((resolve, reject) => {
      const _onFulfilled = (result: T) => {
        if (isFunction(onFulfilled)) {
          try {
            const res = onFulfilled(result)
            if (res === nextPromise) {
              return reject(new TypeError('The `promise` and `x` refer to the same object.'));
            }
            resolve(res)
          } catch (error) {
            reject(error)
          }
        } else {
          resolve(result)
        }
       
      }
      const _onRejected = (reason: any) => {
        if (isFunction(onRejected)) {
          try {
            const res = onRejected(reason)
            if (res === nextPromise) {
              return reject(new TypeError('The `promise` and `x` refer to the same object.'));
            }
            resolve(res)
          } catch (error) {
            reject(error)
          }
        } else {
          reject(reason)
        }
      }
      setTimeout(() => handle(self, {
        onFulfilled: _onFulfilled,
        onRejected: _onRejected,
      }), 0)
    })
    return nextPromise
  }

  static resolve<T>(value: T) {
    return new MyPromise<T>((resolve) => resolve(value))
  }

  static reject(reason: any) {
    return new MyPromise((resolve, reject) => reject(reason))
  }

  static deferred<T>() {
    const deferred: {
      promise: MyPromise<T>,
      resolve: (value: T) => void,
      reject: (reason: any) => void,
    } = {} as any
    deferred.promise = new MyPromise((resolve, reject) => {
      deferred.resolve = resolve
      deferred.reject = reject
    })
    return deferred
  }
}

export default MyPromise
