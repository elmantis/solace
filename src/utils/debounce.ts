export function debounce(fn: (...args: any[]) => void, delay: number) {
    let timeoutId: any;

    const debounced = (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };

    debounced.cancel = () => {
        clearTimeout(timeoutId);
    };

    return debounced;
}