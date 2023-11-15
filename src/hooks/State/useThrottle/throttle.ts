import debounce from "../useDebounce/debounce";
import { isObject } from '../../../utils'

export interface ThrottleOptions{
  leading?: boolean;
  trailing?: boolean;
}

function throttle<T extends (...args: any) => any>(fn: T, wait?: number, options?: ThrottleOptions) {
  let leading = true;
  let trailing = true;

  if (typeof fn !== 'function') {
      throw new TypeError('Expected a function');
  }
  if (isObject(options)) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(fn, wait, {
      leading,
      trailing,
      maxWait: wait,
  });
}

export default throttle
