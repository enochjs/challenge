import { renderHook } from "@testing-library/react"
import useToggle from ".."
import { act } from "react-dom/test-utils"

const setUp = <T, U>(defaultValue?: T, reverseValue?: U) =>  renderHook(() => useToggle(defaultValue, reverseValue))

describe('test useToggle', () => {

  it('test initial value', () => {
    const hook1 = setUp()
    expect(hook1.result.current[0]).toEqual(false)

    const hook2 = setUp(false)
    expect(hook2.result.current[0]).toEqual(false)

    const hook3 = setUp(true)
    expect(hook3.result.current[0]).toEqual(true)

    const hook4 = setUp('hello')
    expect(hook4.result.current[0]).toEqual('hello')

    const hook5 = setUp('hello', 'world')
    expect(hook5.result.current[0]).toEqual('hello')

  })

  it('test method toggle', () => {

    // null value
    const hook1 = setUp()
    expect(hook1.result.current[0]).toEqual(false)
    act(() => {
      hook1.result.current[1].toggle()
    })
    expect(hook1.result.current[0]).toEqual(true)
    act(() => {
      hook1.result.current[1].toggle()
    })
    expect(hook1.result.current[0]).toEqual(false)

    // one value
    const hook2 = setUp(true)
    expect(hook2.result.current[0]).toEqual(true)
    act(() => {
      hook2.result.current[1].toggle()
    })
    expect(hook2.result.current[0]).toEqual(false)
    act(() => {
      hook2.result.current[1].toggle()
    })
    expect(hook2.result.current[0]).toEqual(true)

    // two value
    const hook3 = setUp('hello', 'world')
    expect(hook3.result.current[0]).toEqual('hello')
    act(() => {
      hook3.result.current[1].toggle()
    })
    expect(hook3.result.current[0]).toEqual('world')
    act(() => {
      hook3.result.current[1].toggle()
    })
    expect(hook3.result.current[0]).toEqual('hello')
  })


  it('test method on null value', () => {
    const hook = setUp()
    expect(hook.result.current[0]).toEqual(false)
    // toggle
    act(() => {
      hook.result.current[1].toggle()
    })
    expect(hook.result.current[0]).toEqual(true)
    act(() => {
      hook.result.current[1].toggle()
    })
    expect(hook.result.current[0]).toEqual(false)

    // set right
    act(() => {
      hook.result.current[1].setRight()
    })
    expect(hook.result.current[0]).toEqual(true)

    // set left
    act(() => {
      hook.result.current[1].toggle()
    })
    expect(hook.result.current[0]).toEqual(false)
  })

  it('test method on one value', () => {
    const hook = setUp('hello')
    expect(hook.result.current[0]).toEqual('hello')
    // set right
    act(() => {
      hook.result.current[1].setRight()
    })
    expect(hook.result.current[0]).toEqual(false)

    // set left
    act(() => {
      hook.result.current[1].toggle()
    })
    expect(hook.result.current[0]).toEqual('hello')

    // toggle
    act(() => {
      hook.result.current[1].toggle()
    })

    expect(hook.result.current[0]).toEqual(false)
    act(() => {
      hook.result.current[1].toggle()
    })
    expect(hook.result.current[0]).toEqual('hello')
  })

  it('test method on two value', () => {
    const hook = setUp('hello', 'world')
    expect(hook.result.current[0]).toEqual('hello')
    // set right
    act(() => {
      hook.result.current[1].setRight()
    })
    expect(hook.result.current[0]).toEqual('world')

    // set left
    act(() => {
      hook.result.current[1].toggle()
    })
    expect(hook.result.current[0]).toEqual('hello')
    // toggle
    act(() => {
      hook.result.current[1].toggle()
    })
    expect(hook.result.current[0]).toEqual('world')
    act(() => {
      hook.result.current[1].toggle()
    })
    expect(hook.result.current[0]).toEqual('hello')
  })

})