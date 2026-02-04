/**
 * Theme management composable
 */
import { ref, computed } from 'vue';

interface ThemeSource {
  urlTemplate: string;
  themes: string[];
}

const themeSources: ThemeSource[] = [
  {
    urlTemplate: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/themes/{id}.min.css',
    themes: [
      'prism',
      'prism-dark',
      'prism-funky',
      'prism-okaidia',
      'prism-twilight',
      'prism-solarizedlight',
      'prism-tomorrow',
    ],
  },
  {
    urlTemplate: 'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-{id}.min.css',
    themes: [
      'a11y-dark',
      'atom-dark',
      'base16-ateliersulphurpool.light',
      'cb',
      'coldark-cold',
      'coldark-dark',
      'coy-without-shadows',
      'darcula',
      'dracula',
      'duotone-dark',
      'duotone-earth',
      'duotone-forest',
      'duotone-light',
      'duotone-sea',
      'duotone-space',
      'ghcolors',
      'gruvbox-dark',
      'gruvbox-light',
      'holi-theme',
      'hopscotch',
      'lucario',
      'material-dark',
      'material-light',
      'material-oceanic',
      'night-owl',
      'nord',
      'one-dark',
      'one-light',
      'pojoaque',
      'shades-of-purple',
      'solarized-dark-atom',
      'synthwave84',
      'vs',
      'vsc-dark-plus',
      'xonokai',
      'z-touch',
    ],
  },
];

// Theme options with display names
export const themeOptions = [
  { value: 'prism', label: 'Default' },
  { value: 'a11y-dark', label: 'a11y Dark' },
  { value: 'base16-ateliersulphurpool.light', label: 'Ateliersulphurpool-light' },
  { value: 'atom-dark', label: 'Atom Dark' },
  { value: 'cb', label: 'CB' },
  { value: 'coldark-cold', label: 'Coldark Cold' },
  { value: 'coldark-dark', label: 'Coldark Dark' },
  { value: 'prism-dark', label: 'Dark' },
  { value: 'coy-without-shadows', label: 'Coy' },
  { value: 'darcula', label: 'Darcula' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'duotone-dark', label: 'Duotone Dark' },
  { value: 'duotone-earth', label: 'Duotone Earth' },
  { value: 'duotone-forest', label: 'Duotone Forest' },
  { value: 'duotone-light', label: 'Duotone Light' },
  { value: 'duotone-sea', label: 'Duotone Sea' },
  { value: 'duotone-space', label: 'Duotone Space' },
  { value: 'prism-funky', label: 'Funky' },
  { value: 'ghcolors', label: 'GHColors' },
  { value: 'gruvbox-dark', label: 'Gruvbox Dark' },
  { value: 'gruvbox-light', label: 'Gruvbox Light' },
  { value: 'holi-theme', label: 'Holi Theme' },
  { value: 'hopscotch', label: 'Hopscotch' },
  { value: 'lucario', label: 'Lucario' },
  { value: 'material-dark', label: 'Material Dark' },
  { value: 'material-light', label: 'Material Light' },
  { value: 'material-oceanic', label: 'Material Oceanic' },
  { value: 'night-owl', label: 'Night Owl' },
  { value: 'nord', label: 'Nord' },
  { value: 'prism-okaidia', label: 'Okaidia' },
  { value: 'one-dark', label: 'One Dark' },
  { value: 'one-light', label: 'One Light' },
  { value: 'pojoaque', label: 'Pojoaque' },
  { value: 'shades-of-purple', label: 'Shades of Purple' },
  { value: 'solarized-dark-atom', label: 'Solarized Dark Atom' },
  { value: 'prism-solarizedlight', label: 'Solarized Light' },
  { value: 'synthwave84', label: "Synthwave '84" },
  { value: 'prism-tomorrow', label: 'Tomorrow Night' },
  { value: 'prism-twilight', label: 'Twilight' },
  { value: 'vs', label: 'VS' },
  { value: 'vsc-dark-plus', label: 'VS Code Dark+' },
  { value: 'xonokai', label: 'Xonokai' },
  { value: 'z-touch', label: 'Z-Touch' },
];

/**
 * Get theme URL by ID
 */
function getThemeUrl(id: string): string | null {
  for (const source of themeSources) {
    if (source.themes.includes(id)) {
      return source.urlTemplate.replace('{id}', id);
    }
  }
  return null;
}

/**
 * Composable for theme management
 */
export function useTheme() {
  const currentTheme = ref<string>('prism');
  const isDarkMode = ref<boolean>(false);

  const themeUrl = computed(() => getThemeUrl(currentTheme.value));

  /**
   * Set syntax highlighting theme
   */
  function setTheme(id: string): void {
    const url = getThemeUrl(id);
    if (!url) {
      console.error('Theme not found:', id);
      return;
    }
    currentTheme.value = id;
    localStorage.setItem('theme', id);
  }

  /**
   * Toggle dark mode
   */
  function toggleDarkMode(): void {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('mode', isDarkMode.value ? 'dark' : 'light');
  }

  /**
   * Set dark mode directly
   */
  function setDarkMode(dark: boolean): void {
    isDarkMode.value = dark;
    localStorage.setItem('mode', dark ? 'dark' : 'light');
  }

  /**
   * Restore theme from localStorage
   */
  function restoreTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
      isDarkMode.value = savedMode === 'dark';
    }
  }

  return {
    currentTheme,
    isDarkMode,
    themeUrl,
    themeOptions,
    setTheme,
    toggleDarkMode,
    setDarkMode,
    restoreTheme,
  };
}
