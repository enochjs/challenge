import { useEffect, useRef } from "react";

type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>

function useMemoizedFn<T extends noop>(fn: T) {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  const memoFn = useRef<PickFunction<T>>()

  if (!memoFn.current) {
    memoFn.current = function (this, ...args){
      return fnRef.current.apply(this, args)
    }
  }

  return memoFn.current;

}
export default useMemoizedFn