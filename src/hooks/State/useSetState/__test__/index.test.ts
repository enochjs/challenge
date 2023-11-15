import { act, renderHook } from '@testing-library/react';
import useSetState from '../index';

describe('useSetState', () => {

  const setUp = <T extends object>(initialValue: T) => renderHook(() => {
    const [state, setState] = useSetState(initialValue)
    return {
      state,
      setState
    }
  })

  it('should support initialValue', () => {
    const hook = setUp({
      hello: 'world'
    })
    expect(hook.result.current.state).toEqual({ hello: 'world' })
  })
  
  it('should support object', () => {
    const hook = setUp<any>({
      hello: 'world'
    })
    act(() => {
      hook.result.current.setState({ foo: 'bar'})
    })
    expect(hook.result.current.state).toEqual({ hello: 'world', foo: 'bar' });
  })

  it('should support function update', () => {
    const hook = setUp({
      count: 0
    })
    act(() => {
      hook.result.current.setState((pre) => ({count: pre.count + 1}))
    })
    expect(hook.result.current.state).toEqual({ count: 1 });
  })

})
