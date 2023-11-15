import { useEffect, useRef } from "react"

const useUnMountRef = () => {

  const unMountRef = useRef(false)
  useEffect(() => () => {
    unMountRef.current = true
  }, [])

  return unMountRef

}

export default useUnMountRef