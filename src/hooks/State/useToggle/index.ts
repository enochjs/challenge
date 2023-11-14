import { useMemo, useState } from "react";

type Actions<T> = {
  toggle: () => void;
  set: (state: T) => void;
  setLeft: () => void;
  setRight: () => void;
}

function useToggle(): [boolean, Actions<boolean>];
function useToggle<T>(defaultValue: T): [boolean, Actions<T>]
function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>]

function useToggle<T, U>(defaultValue: T = false as unknown as T, reverseValue?: U) {

  const [state, setState] = useState<T | U>(defaultValue);

  const actions = useMemo(() => {
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as T | U;
    return {
      toggle: () => {
        setState((pre) => pre === defaultValue ? (reverseValueOrigin) : defaultValue)
      },
      setLeft: () => setState(defaultValue),
      setRight: () => setState(reverseValueOrigin),
      set: (value: T | U) => setState(value)
    }

  }, [])

  return [state, actions]
}

export default useToggle