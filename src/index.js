const isFunction = (v) => typeof v === 'function'
const setImmediate = (func) => setTimeout(func, 0);
const getThen = (value) => {
  var type = typeof value;
  var then;
  if (value && (type === 'object' || type === 'function')) {
      then = value.then;
      if (typeof then === 'function') {
          return then;
      }
  }
  return null;
}
const curry = (func, arg1) => (arg2) => func(arg1, arg2)

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const doResolve = (fn, onFulfilled, onRejected) => {
  let done = false
  try {
    fn((result) => {
      if (done) return;
      done = true
      setImmediate(() => onFulfilled(result))
    }, (reason) => {
      if (done) return;
      done = true
      setImmediate(() => onRejected(reason))
    })
  } catch (error) {
    if (done) return;
    done = true
    setImmediate(() => onRejected(error))
  }
}

const handle = (promise, handler) => {
  const { state, value, handlers } = promise
  switch (state) {
    case PENDING:
      handlers.push(handler)
      return;
    case FULFILLED:
      isFunction(handler.onFulfilled) && handler.onFulfilled(value)
      return;
    case REJECTED:
      isFunction(handler.onRejected) && handler.onRejected(value)
      return
  }
}

const final = (promise) => {
  if (promise.handlers != null) {
    promise.handlers.forEach(curry(handle, promise))
    promise.handlers = null
  }
}

const fulfill = (promise, result) => {
  promise.state = FULFILLED
  promise.value = result;
  final(promise)
}

const reject = (promise, reason) => {
  promise.state = REJECTED
  promise.value = reason
  final(promise)
}

const resolve = (promise, result) => {
  try {
    const then = getThen(result)
    if (then) {
      doResolve((onFulfilled, onRejected) => then.call(result, onFulfilled, onRejected), curry(resolve, promise), curry(reject, promise))
      return
    }
    fulfill(promise, result)
  } catch (error) {
    reject(promise, error)
  }
}

class Promise {

  constructor(handler) {
    if (!isFunction(handler)) {
      throw new Error('handle should be a function')
    }
    this.state = PENDING
    this.value = null
    this.handlers = []
    doResolve(handler, curry(resolve, this), curry(reject, this))
  }

  then(onFulfilled, onRejected) {
    const nextPromise = new Promise((resolve, reject) => {
      const _onFulfilled = (result) => {
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
        }
        resolve(result)
      }
      const _onRejected = (reason) => {
        if(isFunction(onRejected)) {
          try {
            const res = onRejected(reason)
            if (res === nextPromise) {
              return reject(new TypeError('The `promise` and `x` refer to the same object.'));
            }
            resolve(res)
          } catch (error) {
            reject(error)
          }
        }
        reject(reason)
      }
      setImmediate(() => handle(this, {
        onFulfilled: _onFulfilled,
        onRejected: _onRejected,
      }))
    })
    return nextPromise
  }

  static resolve(value) {
    return new Promise((resolve) => resolve(value))
  }

  static reject(reason) {
    return new Promise((resolve, reject) => reject(reason))
  }

  static deferred() {
    const deferred = {}
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve
      deferred.reject = reject
    })
    return deferred
  }
}

module.exports = Promise