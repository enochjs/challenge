import { useCallback, useEffect, useState } from "react";
import throttle, { ThrottleOptions } from "./throttle";

export interface UseThrottleOptions extends ThrottleOptions {
  wait?: number
}

function useThrottle<T>(value: T, options: UseThrottleOptions) {
  // todo

  const { wait = 1000, ...otherOptions } = options

  const [throttleValue, setThrottleValue] = useState<T>(value);

  const throttleFn = useCallback(throttle((v) => {
      setThrottleValue(v)
  }, wait, otherOptions), [])

  useEffect(() => {
    throttleFn(value)
  }, [value])

  return throttleValue

}

export default useThrottle