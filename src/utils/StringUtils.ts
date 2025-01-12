// utils/StringUtils.ts

/**
 * Converts a camelCase or PascalCase string to a readable format with spaces.
 * @param str - The camelCase or PascalCase string.
 * @returns A string with spaces between words, with the first letter capitalized.
 */
export function camelCaseToReadable(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1') // Add space before each uppercase letter
    .replace(/^./, (char) => char.toUpperCase()); // Capitalize the first character
}

/**
 * Converts a snake_case string to a readable format with spaces.
 * @param str - The snake_case string.
 * @returns A string with spaces between words, with each word capitalized.
 */
export function underscoreToReadable(str: string): string {
  return str
    .split('_') // Split at underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join words with spaces
}
