import { renderHook } from "@testing-library/react"
import useMap from ".."
import { act } from "react-dom/test-utils"

describe('useMap', () => {
  // todo
  it('test with use iterable value', () => {
    const hook = renderHook(() => useMap<string | number, string>([
      ['msg', 'hello world'],
      [123, 'number type'],
    ]))
    expect(hook.result.current[0]).toEqual(new Map<string | number, string>([
      ['msg', 'hello world'],
      [123, 'number type'],
    ]))
  })

  it('test with use map value', () => {
    const map = new Map<string | number, string>([
      ['msg', 'hello world'],
      [123, 'number type'],
    ])
    const hook = renderHook(() => useMap<string | number, string>(map))
    expect(hook.result.current[0]).toEqual(new Map<string | number, string>([
      ['msg', 'hello world'],
      [123, 'number type'],
    ]))
  })

  it('test with actions', () => {
    const map = new Map<string | number, string>([
      ['msg', 'hello world'],
      [123, 'number type'],
    ])
    const hook = renderHook(() => useMap<string | number, string>(map))
    expect(hook.result.current[1].get('msg')).toBe('hello world')

    act(() => {
      hook.result.current[1].set('hello', 'world')
    })
    expect(hook.result.current[1].get('hello')).toBe('world')

    act(() => {
      hook.result.current[1].set('hello', 'enoch')
    })
    expect(hook.result.current[1].get('hello')).toBe('enoch')

    act(() => {
      hook.result.current[1].remove('hello')
    })
    expect(hook.result.current[1].get('hello')).toBeUndefined()


    act(() => {
      hook.result.current[1].setAll(new Map([['test', '123']]))
    })
    expect(hook.result.current[0]).toEqual(new Map([['test', '123']]))

    act(() => {
      hook.result.current[1].reset()
    })

    expect(hook.result.current[0]).toEqual(map)
  })

})