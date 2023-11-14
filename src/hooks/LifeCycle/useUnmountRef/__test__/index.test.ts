import { renderHook } from "@testing-library/react"
import useUnMountRef from ".."

describe('useUnMountRef', () => {
  it('use unmount ref', () => {

    const hook = renderHook(() => useUnMountRef())
    expect(hook.result.current).toStrictEqual({ current: false })
    hook.rerender()
    expect(hook.result.current).toStrictEqual({ current: false })
    hook.unmount()
    expect(hook.result.current).toStrictEqual({ current: true })
  })
})