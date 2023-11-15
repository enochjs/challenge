import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";

function useGetState<S>(initialState?: S | (() => S)): [S, Dispatch<SetStateAction<S>>, () => S] {

  const [state, setState] = useState(initialState);
  const lastStateRef = useRef<S>(state);
  lastStateRef.current = state

  const getState = useCallback(() => {
    return lastStateRef.current
  }, [])

  return [state, setState, getState]

}

export default useGetState