import { renderHook } from "@testing-library/react"
import useBoolean from ".."
import { act } from "react-dom/test-utils"

const setUp = (defaultValue?: boolean) => renderHook(() => useBoolean(defaultValue));

describe('useBoolean', () => {

  it('test initial value', () => {
    const hook1 = setUp()
    expect(hook1.result.current).toEqual(false)
    const hook2 = setUp(false)
    expect(hook2.result.current).toEqual(false)
    const hook3 = setUp(true)
    expect(hook3.result.current).toEqual(true)
  })

  it('test method toggle', () => {
    const hook = setUp()
    expect(hook.result.current[0]).toEqual(false)
    act(() => {
      hook.result.current[1].toggle()
    })
    expect(hook.result.current[0]).toEqual(true)
    act(() => {
      hook.result.current[1].toggle()
    })
    expect(hook.result.current[0]).toEqual(false)

  })

  it('test method setFalse', () => {
    const hook = setUp()
    expect(hook.result.current[0]).toEqual(true)
    act(() => {
      hook.result.current[1].setFalse()
    })
    expect(hook.result.current[0]).toEqual(false)
    act(() => {
      hook.result.current[1].setFalse()
    })
    expect(hook.result.current[0]).toEqual(false)
  })

  it('test method setTrue', () => {
    const hook = setUp()
    expect(hook.result.current[0]).toEqual(false)
    act(() => {
      hook.result.current[1].setTrue()
    })
    expect(hook.result.current[0]).toEqual(true)
    act(() => {
      hook.result.current[1].setTrue()
    })
    expect(hook.result.current[0]).toEqual(true)
  })


  it('test method set', () => {
    const hook = setUp()
    expect(hook.result.current[0]).toEqual(false)
    act(() => {
      hook.result.current[1].set(true)
    })
    expect(hook.result.current[0]).toEqual(true)
    act(() => {
      hook.result.current[1].set(false)
    })
    expect(hook.result.current[0]).toEqual(false)
  })

})