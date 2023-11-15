// https://css-tricks.com/debouncing-throttling-explained-examples/#aa-how-to-use-debounce-and-throttle-and-common-pitfalls
export interface DebounceOptions{
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
}

function debounce<T extends (...args: any) => any>(fn: T, wait = 0, options?: DebounceOptions) {

  const { trailing = true, leading = false, maxWait } = options || {}

  let timerId: NodeJS.Timeout
  let lastThis: any
  let lastArgs: any
  let lastCallTime: number
  let lastInvokeTime: number

  function startTimer(pendingFunc, milliseconds) {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    return setTimeout(pendingFunc, milliseconds);
  }

  function invokeFunc(time: number) {
    const _lastThis = lastThis;
    const _lastArgs = lastArgs
    lastThis = lastArgs = undefined
    lastInvokeTime = time
    fn.apply(_lastThis, _lastArgs)
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return (
        // flush
        lastCallTime === undefined ||
        // 时间超过 wait 的值
        timeSinceLastCall >= wait ||
        // 超过最大等待时间
        (maxWait && timeSinceLastInvoke >= maxWait)
    );

  }

  function trailingEdge(time: number) {
    timerId = undefined;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxWait ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function timerExpired() {
    const time = Date.now();
    // 过期时间到了以后，则判断是否需要执行invoke，如果需要，则循环结束，清除timer
    // 如果shouldInvoke(time) 返回false，说明 lastCallTime 或者lastInvokeTime有更新
    if (shouldInvoke(time)) {
        return trailingEdge(time);
    }
    timerId = startTimer(timerExpired, remainingWait(time));
  }


  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = startTimer(timerExpired, wait);
    if (leading) {
      invokeFunc(time)
    }
  }

  function debounced(this: any, ...args: Parameters<T>): void {
    const time = Date.now()
    lastThis = this
    lastArgs = args
    // 每次执行更新 lastCallTime 
    // invokeFunc 通过比对 lastCallTime 和 lastInvokeTime 来执行
    lastCallTime = time
    if (timerId === undefined) {
      leadingEdge(time)
    }
  }

  debounced.cancel = () => {
    clearTimeout(timerId)
  }

  debounced.flush = () => {
    if (timerId) {
      trailingEdge(Date.now())
    }
  }

  return debounced
}

export default debounce

