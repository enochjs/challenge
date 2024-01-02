import { useRef } from "react"

export type ShouldUpdateFunc<T> = (Pre: T, next: T) => boolean

function defaultShouldUpdate<T>(pre: T, next: T) {
  return !Object.is(pre, next)
}

function usePrevious<T>(value: T, shouldUpdate: ShouldUpdateFunc<T> = defaultShouldUpdate): T | undefined {
  const prevRef = useRef<T>()
  const curRef = useRef<T>()

  if (shouldUpdate(curRef.current, value)) {
    prevRef.current = curRef.current
    curRef.current = value
  }

  return prevRef.current
}
export default usePrevious