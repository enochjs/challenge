import { act, renderHook } from "@testing-library/react"
import Cookies from 'js-cookie'
import useCookieState, { IOptions } from ".."

const setUp = (key: string, options: IOptions) =>
  renderHook(() => {
    const [state, setState] = useCookieState(key, options);
    return {
      state,
      setState,
    } as const;
  });



describe('test useCookieState', () => {


  it('test cookie value', () => {
    const cookieKey = 'test_cookie'
    const hook = setUp(cookieKey, {
      defaultValue: 'A'
    })
    expect(hook.result.current.state).toEqual('A')

    act(() => {
      hook.result.current.setState('B');
    });
    expect(Cookies.get(cookieKey)).toEqual('B')
    expect(hook.result.current.state).toEqual('B')

    const anotherHook = setUp(cookieKey, {
      defaultValue: 'A',
    });
    expect(anotherHook.result.current.state).toBe('B');
    act(() => {
      anotherHook.result.current.setState('C');
    });
    expect(anotherHook.result.current.state).toBe('C');
    expect(hook.result.current.state).toBe('B');
    expect(Cookies.get(cookieKey)).toBe('C');
  })

  it('test function update', () => {
    const cookieKey = 'test-function-update'
    const hook = setUp(cookieKey, {
      defaultValue: () => 'hello world'
    })
    expect(hook.result.current.state).toEqual('hello world')

    act(() => {
      hook.result.current.setState((state) => `${state}, zhangsan`);
    });
    expect(hook.result.current.state).toBe('hello world, zhangsan');

    act(() => {
      hook.result.current.setState((state) => `${state}, lisi`);
    });
    expect(hook.result.current.state).toBe('hello world, zhangsan, lisi');

  })

  it('test same cookie key', () => {

    const cookieKey = 'same-cookie-key'

  })

})