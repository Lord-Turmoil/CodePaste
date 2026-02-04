/**
 * User preferences composable
 */
import { ref, watch } from 'vue';
import { getCookie, setCookie } from '@/utils';

/**
 * Composable for managing user preferences
 */
export function useUserPreferences() {
  const language = ref<string | null>(null);
  const lineNumberEnabled = ref<boolean>(false);
  const notificationShown = ref<boolean>(false);

  /**
   * Restore language preference
   */
  function restoreLanguage(): string | null {
    const saved = localStorage.getItem('language');
    if (saved) {
      language.value = saved;
    }
    return saved;
  }

  /**
   * Save language preference
   */
  function saveLanguage(lang: string): void {
    language.value = lang;
    localStorage.setItem('language', lang);
  }

  /**
   * Restore line number preference
   */
  function restoreLineNumber(): boolean {
    const saved = localStorage.getItem('line-number');
    if (saved !== null) {
      lineNumberEnabled.value = saved === 'true';
    }
    return lineNumberEnabled.value;
  }

  /**
   * Save line number preference
   */
  function saveLineNumber(enabled: boolean): void {
    lineNumberEnabled.value = enabled;
    localStorage.setItem('line-number', String(enabled));
  }

  /**
   * Check if notification has been shown
   */
  function checkNotificationShown(): boolean {
    const cookie = getCookie('notification');
    notificationShown.value = cookie !== '';
    return notificationShown.value;
  }

  /**
   * Mark notification as shown
   */
  function markNotificationShown(): void {
    setCookie('notification', 'notified', 24 * 7); // one week
    notificationShown.value = true;
  }

  /**
   * Restore all preferences
   */
  function restoreAll(): void {
    restoreLanguage();
    restoreLineNumber();
    checkNotificationShown();
  }

  return {
    language,
    lineNumberEnabled,
    notificationShown,
    restoreLanguage,
    saveLanguage,
    restoreLineNumber,
    saveLineNumber,
    checkNotificationShown,
    markNotificationShown,
    restoreAll,
  };
}
