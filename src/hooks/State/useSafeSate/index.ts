import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]

function useSafeState<S>(initialState: undefined): [S, Dispatch<SetStateAction<S>>]

function useSafeState<S>(initialState: S | (() => S)) {

  const [state, setState] = useState(initialState);

  const activeRef = useRef(false);

  const action = useCallback((s:  S | ((pre: S) => S)) => {
    if (activeRef.current) {
      setState(s)
    }
  }, [])

  useEffect(() => {
    activeRef.current = true
    return () => { activeRef.current = false }
  }, [])

  return [state, action] as const

}

export default useSafeState