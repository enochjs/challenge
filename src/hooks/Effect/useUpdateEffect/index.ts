import { EffectCallback, useEffect, useRef } from "react";

function useUpdateEffect(fn: EffectCallback, deps?: React.DependencyList) {


  const mountedRef = useRef(false)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (mountedRef.current) {
      return fn()
    } else {
      mountedRef.current = true
    }
  }, deps)

}

export default useUpdateEffect