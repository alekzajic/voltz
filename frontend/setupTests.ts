import '@testing-library/jest-dom';

// @ts-ignore
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};
