import { useRef } from "react"

export type ShouldUpdateFunc<T> = (Pre: T, next: T) => boolean

function defaultShouldUpdate<T>(pre: T, next: T) {
  return !Object.is(pre, next)
}

function usePrevious<T>(value: T, shouldUpdate: ShouldUpdateFunc<T> = defaultShouldUpdate): T | undefined {

  const preRef = useRef<T>()
  const curRef = useRef<T>()

  if (shouldUpdate(curRef.current, value)) {
    preRef.current = curRef.current
    curRef.current = value
  }

  return preRef.current

}

export default usePrevious