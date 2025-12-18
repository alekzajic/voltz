import '@testing-library/jest-dom';

// @ts-expect-error: global.ResizeObserver is not defined in the jest environment
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};
