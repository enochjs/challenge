import { renderHook } from "@testing-library/react"
import useUnMount from ".."

describe('useUnMount', () => {

  it('test unmount', () => {
    const fn = jest.fn()

    const hook = renderHook(() => useUnMount(fn))
    expect(fn).toHaveBeenCalledTimes(0)
    hook.rerender()
    expect(fn).toHaveBeenCalledTimes(0)
    hook.unmount()
    expect(fn).toHaveBeenCalledTimes(1)

    renderHook(() => useUnMount(fn)).unmount()
    expect(fn).toHaveBeenCalledTimes(2)

  })

})