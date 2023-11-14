type State = 'pending' | 'fulfilled' | 'rejected'

type Handler = (resolve: (value: any) => void, reject: (reason: any) => void) => void

type OnFulfilled = (value: any) => void
type OnRejected = (value: any) => void

type Handlers = {
  onFulfilled: OnFulfilled;
  onRejected: OnRejected;
}

const isFunction = (v: any) => typeof v === 'function'

const getThen = (v: any) => isFunction(v.then) ? v.then : null

class MyPromise {

  private state: State;
  private value: any;
  private handlers: any[]

  private handle(handler: Handlers) {
    switch (this.state) {
      case 'pending':
        this.handlers.push(handler)
        break;
      case 'fulfilled':
        isFunction(handler.onFulfilled) && handler.onFulfilled(this.value)
        break;
      case 'rejected': 
        isFunction(handler.onRejected) && handler.onRejected(this.value)
        break;
    }
  }

  private _finally() {
    if (this.handlers.length) {
      this.handlers.forEach((item) => {
        this.handle(item)
      })
    }
  }

  private _fulfill(value: any) {
    this.state ='fulfilled'
    this.value = value
    this._finally()
  }

  private _reject(reason: any) {
    this.state = 'rejected'
    this.value = reason;
    this._finally()
  }


  private _resolve(result: any) {
    const self = this;
    try {
      const then = getThen(result)
      if (then) {
        result.then((result) => {
          self._resolve(result)
        }, (reason) => {
          self._reject(reason)
        })
      } else {
        this._fulfill(result)
      }
    } catch (error) {
      this._reject(error)
    }
  }

  constructor(handler: Handler) {
    if (!isFunction(handler)) {
      throw new Error(`handler must be a function`)
    }
    this.state = 'pending'
    this.value = null
    this.handlers = []

    const self = this;
    try {
      handler((value) => {
        self._resolve(value)
      }, (reason) => {
        self._reject(reason)
      })
    } catch (error) {
      self._reject(error)
    }
  }

  then(onFulfilled: OnFulfilled, onRejected: OnRejected) {

    // todo
    let result, self = this;

    const nextPromise = new MyPromise((resolve, reject) => {
      // 
      //


    })

  }


}



