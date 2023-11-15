import { useCallback, useMemo, useRef, useState } from "react";

function useMap<K, V>(initialValue?: Iterable<[K, V]>) {

  const defaultValue = useRef(initialValue)
  const mapRef = useRef<Map<K, V>>(new Map(initialValue))

  const [update, setUpdate] = useState(0);

  const forceUpdate = useCallback(() => {
    setUpdate(pre => pre + 1)
  }, [])


  const actions = useMemo(() => {
    return {
      get: (key: K) => mapRef.current.get(key),
      set: (key: K, value: V) => {
        mapRef.current.set(key, value)
        forceUpdate()
      },
      setAll: (newMap: Iterable<[K, V]>) => {
        mapRef.current = new Map(newMap);
        forceUpdate()
      },
      remove: (key: K) => {
        mapRef.current.delete(key)
        forceUpdate()
      },
      reset: () => {
        mapRef.current = new Map(defaultValue.current)
        forceUpdate()
      }
    }
  }, [])

  return [mapRef.current, actions] as const

}

export default useMap