/**
 * Type definitions for CodePaste application
 */

/**
 * Version entry item
 */
export interface VersionEntryItem {
  title: string;
  items: string[];
}

/**
 * Version data structure
 */
export interface VersionData {
  version: string;
  date: string;
  entries: VersionEntryItem[];
}

/**
 * Code samples dictionary
 */
export interface CodeSamples {
  [language: string]: string;
}

/**
 * Language option for select dropdown
 */
export interface LanguageOption {
  value: string;
  label: string;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  id: string;
  name: string;
  url: string;
}

/**
 * User preferences stored in localStorage
 */
export interface UserPreferences {
  language: string | null;
  lineNumber: boolean;
  mode: 'light' | 'dark';
  theme: string;
}

/**
 * Action button types
 */
export type ActionType = 'convert' | 'copy' | 'erase' | 'random' | 'issue' | 'coffee';

/**
 * Paste operation result
 */
export interface PasteResult {
  success: boolean;
  message: string;
}
