import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce, { DebounceOptions } from "./debounce";

interface IUseDebounceOptions extends DebounceOptions {
  wait?: number
}

const useDebounce = <T = any>(value: T, options?: IUseDebounceOptions) => {

  const { wait = 1000, ...otherOptions} = options || {}
  const [debounceValue, setDebounced] = useState(value);

  const debounced = useCallback(debounce((v) => {
    setDebounced(v)
  }, wait, otherOptions), [])

  useEffect(() => {
    debounced(value)
  }, [value])

  return debounceValue

}

export default useDebounce