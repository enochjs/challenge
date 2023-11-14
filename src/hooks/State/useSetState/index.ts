import isFunction from "../../../utils/isFunction";
import { useCallback, useState } from "react"

type SetState<S extends Record<string, any>> = <K extends keyof S>(state: Pick<S, K> | null | ((preState: Readonly<S>) => Pick<S, K> | S | null)) => void

const useSetState = <S extends Record<string, any>>(initialState:  S | (() => S)): [S, SetState<S>] => {

  const [state, setState] = useState<S>(initialState);

  const setMergeState = useCallback((patch) => {
    const newState = isFunction(patch) ? patch(state) : patch;
    setState({
      ...state,
      ...newState,
    })
  }, [state])

  return [state, setMergeState]

}

export default useSetState
