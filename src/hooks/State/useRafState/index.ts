import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import useUnMount from "../../LifeCycle/useUnMount";

type Action<S> = (state: S | ((state: S) => S)) => void

function useRafState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
function useRafState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

function useRafState<S>(initialState?: S | (() => S)) {
  const ref = useRef(0)

  const [state, setState] = useState<S>(initialState);

  const action: Action<S> = useCallback((s) => {
    cancelAnimationFrame(ref.current)
    ref.current = requestAnimationFrame(() => {
      setState(s)
    })
  }, [])

  useUnMount(() => {
    cancelAnimationFrame(ref.current)
  })

  return [state, action] as const
}


export default useRafState