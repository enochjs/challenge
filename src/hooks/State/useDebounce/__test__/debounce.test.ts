import debounce from "../debounce";

jest.useFakeTimers();

describe('test debounce', () => {

  it('should exec in nexttick when wait time zero', () =>  {
    const callback = jest.fn();
    const debounced = debounce(callback, 0, {});
    debounced()
    debounced()
    debounced()
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  })

  it('should exec after wait time', () =>  {
    const callback = jest.fn();
    const debounced = debounce(callback, 3000, {});
    debounced()
    debounced()
    debounced()
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2000);
    expect(callback).not.toHaveBeenCalled();

    // Now our callback should have been called!
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    debounced()
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(2);
  })

  it('should exec after wait max time', () => {
    const callback = jest.fn();
    const debounced = debounce(callback, 1000, {
      maxWait: 3000
    });
    for (let i = 0; i < 4; i++) {
      debounced()
      jest.advanceTimersByTime(800);
    }
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
    debounced()
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(2);
  })

  it('should work with leading', () => {
    const callback = jest.fn()
    const debounced = debounce(callback, 1000, {
      leading: true,
      trailing: false
    })
    debounced()
    debounced()
    debounced()
    debounced()
    debounced()
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(1);
  })

  it('should work with flush', () => {
    const callback = jest.fn()
    const debounced = debounce(callback, 1000)
    debounced()
    debounced()
    debounced()
    debounced()
    expect(callback).not.toHaveBeenCalled();
    debounced.flush()
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(1);
  })

  it('should work with cancel', () => {
    const callback = jest.fn()
    const debounced = debounce(callback, 1000)
    debounced()
    debounced()
    debounced()
    expect(callback).not.toHaveBeenCalled();
    debounced.cancel()
    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(0);
  })

})