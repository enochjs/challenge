import throttle from "../throttle";

jest.useFakeTimers()

describe('throttle', () => {

  it('test throttle', () => {
    const callback = jest.fn();
    const throttled = throttle(callback, 1000);
    throttled()
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(200)
    throttled();
    throttled();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.runAllTimers()
    expect(callback).toHaveBeenCalledTimes(2);
    throttled()
    expect(callback).toHaveBeenCalledTimes(3);
  })


})