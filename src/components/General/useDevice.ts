export const useDevice = () =>
  window.innerWidth > 768
    ? "tablet"
    : window.innerWidth > 1024
    ? "desktop"
    : window.innerWidth > 1148
    ? "lgscreen"
    : "mobile";

export default useDevice;
