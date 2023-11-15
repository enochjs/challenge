import { useEffect } from "react"

const useUnMount = (fn: () => void) => {

  useEffect(() => () => fn?.(), [])
}

export default useUnMount