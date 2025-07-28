export {};

declare global {
  interface Window {
    gtag: (...args) => void;
  }
}
