import { isFunction, isString } from '../../../utils';
import Cookies from 'js-cookie'
import { useCallback, useState } from 'react';

export type State = string | undefined;

export interface IOptions extends Cookies.CookieAttributes {
  defaultValue?: State | (() => State);
}

const useCookieState = (cookieKey: string, options: IOptions = {}) => {

  const [state, setState] = useState<State>(() => {
    const cookieValue = Cookies.get(cookieKey)
    if (isString(cookieValue)) {
      return cookieValue
    }
    if (isFunction(options.defaultValue)) {
      return options.defaultValue()
    }
    return options.defaultValue
  });


  const updater = useCallback((newValue: State | ((prevState: State) => State), newOptions: Cookies.CookieAttributes = {}) => {
    const { defaultValue, ...restOptions } = { ...options, ...newOptions };
    const value = isFunction(newValue) ? newValue(state) : newValue;
    setState(value);
    if (value === undefined) {
      Cookies.remove(cookieKey);
    } else {
      Cookies.set(cookieKey, value, restOptions);
    }
  }, [state])

  return [state, updater] as const

}

export default useCookieState