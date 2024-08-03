/**
 * Utility function to conditionally join class names together.
 * @param classes - Array of class names to join.
 * @returns A string of joined class names.
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
