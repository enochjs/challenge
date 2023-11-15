import { renderHook } from "@testing-library/react"
import useSafeState from ".."
import { act } from "react-dom/test-utils"

describe('test useSafeState', () => {

  it('test with mounted', () => {

    const hook = renderHook(() => useSafeState(1))
    expect(hook.result.current[0]).toBe(1)
    const action = hook.result.current[1]

    act(() => {
      action(2)
    })

    expect(hook.result.current[0]).toBe(2)
  })

  it('test with unmounted', () => {

    const hook = renderHook(() => useSafeState(1))
    expect(hook.result.current[0]).toBe(1)
    const action = hook.result.current[1]

    act(() => {
      action(2)
    })

    expect(hook.result.current[0]).toBe(2)
    
    hook.unmount()

    act(() => {
      action(3)
    })

    expect(hook.result.current[0]).toBe(2)
    

  })

})