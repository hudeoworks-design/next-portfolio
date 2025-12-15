// --- Image Utilities ---

/**
 * Generates an SVG string for a smooth, subtle shimmer effect placeholder.
 * @param w Width of the SVG.
 * @param h Height of the SVG.
 */
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <!-- Use lighter grays for a softer effect -->
      <stop stop-color="#ddd" offset="20%" />
      <stop stop-color="#ccc" offset="50%" />
      <stop stop-color="#ddd" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#ddd" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

/**
 * Encodes a string to Base64, handling both Node.js (server-side) and browser (client-side) environments.
 * @param str The string to encode.
 */
const toBase64 = (str: string): string => {
  if (typeof window === 'undefined') {
    // Server-side (Node.js/Next.js runtime)
    return Buffer.from(str).toString('base64');
  } else {
    // Client-side (Browser)
    return window.btoa(str);
  }
};

/**
 * Creates a data URL string containing an SVG shimmer effect placeholder.
 * Use this as the `blurDataURL` prop for the Next.js `Image` component.
 * @param w Width of the placeholder.
 * @param h Height of the placeholder.
 */
export function getDataUrlWithShimmerEffect(w: number, h: number): string {
  return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
}