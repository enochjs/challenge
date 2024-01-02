
const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

const isFunction = (value) => typeof value === 'function'
const setImmediate = (fn) => setTimeout(fn, 0)


const getThen = (value) => {
  if (value && (typeof value === 'object' || typeof value === 'function')) {
    // 2.3.3.1 Let then be x.then
    const then = value.then
    if (typeof then === 'function') {
      return then
    }
  }
  return null
}

const curry = (fn, args1) => (args2) => fn(args1, args2)

const doResolve = (handler, onFulfilled, onRejected) => {
  let done = false
  try {
    handler((result) => {
      if (done) {
        return
      }
      done = true
      setImmediate(() => onFulfilled(result))
    }, (reason) => {
      if (done) {
        return
      }
      done = true
      setImmediate(() => onRejected(reason))
    })
  } catch (error) {
    if (done) {
      return
    }
    done = true
    setImmediate(() => onRejected(error))
  }
}

const fulfill = (promise, value) => {
  promise.state = FULFILLED
  promise.value = value;
  finale(promise)
}

const reject = (promise, reason) => {
  promise.state = REJECTED;
  promise.value = reason;
  finale(promise)
}

const handle = (promise, handler) => {
  const { state, value, handlers } = promise;
  switch (state) {
    case PENDING:
      handlers.push(handler)
      return
    case FULFILLED:
      isFunction(handler.onFulfilled) && handler.onFulfilled(value)
      return
    case REJECTED:
      isFunction(handler.onRejected) && handler.onRejected(value)
      return
  } 

}

const finale = (promise) => {
  if (promise.handlers) {
    promise.handlers.forEach(handler => handle(promise, handler))
    promise.handlers = null
  }

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


class MyPromise {

  constructor(handler) {
    this.state = PENDING
    this.value = null;
    this.handlers = []
    doResolve(handler, curry(resolve, this), curry(reject, this))
  }

  then(onFulfilled, onRejected) {
    const nextPromise = new MyPromise((resolve, reject) => {
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
        } else {
          resolve(result)
        }
       
      }
      const _onRejected = (reason) => {
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
      setImmediate(() => handle(this, {
        onFulfilled: _onFulfilled,
        onRejected: _onRejected,
      }))

    })
    return nextPromise
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value))
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }

  static deferred() {
    const deferred = {}
    deferred.promise = new MyPromise((resolve, reject) => {
      deferred.resolve = resolve
      deferred.reject = reject
    })
    return deferred
  }


}

module.exports = MyPromise