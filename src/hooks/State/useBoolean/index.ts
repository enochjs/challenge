import { useMemo, useState } from "react";

const useBoolean = (initialValue: boolean = false): [boolean, {
  set: (value: boolean) => void;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}] => {

  const [state, setState] = useState(!!initialValue);


  const actions = useMemo(() => {

    const toggle = () => {
      setState((pre) => !pre)
    }
    const setTrue = () => {
      setState(true)
    }
    const setFalse = () => {
      setState(false)
    }

    const set = (value: boolean) => {
      setState(value)
    }

    return {
      set,
      toggle,
      setTrue,
      setFalse
    }

  }, [])

  return [state, actions]

}

export default useBoolean