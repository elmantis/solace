import { debounce } from "./debounce";

jest.useFakeTimers();

describe("debounce", () => {
    it("calls the function after the delay", () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 200);

        debounced("hello");
        expect(fn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(200);
        expect(fn).toHaveBeenCalledWith("hello");
    });

    it("resets the delay if called again before timeout", () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 300);

        debounced("a");
        jest.advanceTimersByTime(100);
        debounced("b");
        jest.advanceTimersByTime(100);
        debounced("c");

        jest.advanceTimersByTime(300);
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith("c");
    });

    it("does not call the function if cancelled", () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 250);

        debounced("should cancel");
        debounced.cancel();

        jest.advanceTimersByTime(300);
        expect(fn).not.toHaveBeenCalled();
    });
});