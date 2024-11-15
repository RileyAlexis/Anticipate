export function hexToRgba(hex: string, alpha: number = 0.3): string {
    // Remove the '#' if present
    const sanitizedHex = hex.replace('#', '');

    // Parse the red, green, and blue components
    const r = parseInt(sanitizedHex.substring(0, 2), 16);
    const g = parseInt(sanitizedHex.substring(2, 4), 16);
    const b = parseInt(sanitizedHex.substring(4, 6), 16);

    // Return the RGBA string
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}