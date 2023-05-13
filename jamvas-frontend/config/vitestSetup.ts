import { vi, expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import "whatwg-fetch"; // Polyfill for fetch which is not available in node environment where tests are executed
import resizeObserverPolyfill from "resize-observer-polyfill";

// Mocking tone.js audio internals
vi.mock("tone", async () => {
  return {
    start: vi.fn(),
    Sampler: vi.fn().mockImplementation(() => ({
      toDestination: vi.fn().mockReturnValue({}),
    })),
    Filter: vi.fn().mockImplementation(() => ({
      toDestination: vi.fn().mockReturnValue({}),
      connect: vi.fn().mockReturnValue({}),
    })),
    Reverb: vi.fn().mockImplementation(() => ({
      toDestination: vi.fn().mockReturnValue({}),
      connect: vi.fn().mockReturnValue({}),
    })),
    PolySynth: vi.fn().mockImplementation(() => ({
      toDestination: vi.fn().mockReturnValue({}),
      connect: vi.fn().mockReturnValue({ connect: vi.fn().mockReturnValue({}) }),
    })),
    Synth: vi.fn(),
    Sequence: vi.fn(),
  };
});

// Added for compatibility with react-hot-toast library
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.ResizeObserver = resizeObserverPolyfill;

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
