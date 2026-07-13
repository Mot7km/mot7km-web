import { useTranslations } from 'next-intl';

/**
 * Format a date relative to now (e.g., "2 days ago", "just now")
 * @param dateStr - ISO date string
 * @param t - Translation function from next-intl (optional for server-side)
 * @returns Formatted relative date string
 */
function formatRelativeDate(dateStr: string, t?: ReturnType<typeof useTranslations>): string {
  const now = new Date();
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  // If no translation function provided, fallback to English
  if (!t) {
    if (diffYears > 0) {
      return diffYears === 1 ? 'a year ago' : `${diffYears} years ago`;
    }
    if (diffMonths > 0) {
      return diffMonths === 1 ? 'a month ago' : `${diffMonths} months ago`;
    }
    if (diffDays > 0) {
      return diffDays === 1 ? 'yesterday' : `${diffDays} days ago`;
    }
    if (diffHours > 0) {
      return diffHours === 1 ? 'an hour ago' : `${diffHours} hours ago`;
    }
    if (diffMinutes > 0) {
      return diffMinutes === 1 ? 'a minute ago' : `${diffMinutes} minutes ago`;
    }
    return 'just now';
  }

  // With translation
  if (diffYears > 0) {
    return t('common.time.yearsAgo', { count: diffYears });
  }
  if (diffMonths > 0) {
    return t('common.time.monthsAgo', { count: diffMonths });
  }
  if (diffDays > 0) {
    if (diffDays === 1) {
      return t('common.time.yesterday');
    }
    return t('common.time.daysAgo', { count: diffDays });
  }
  if (diffHours > 0) {
    return t('common.time.hoursAgo', { count: diffHours });
  }
  if (diffMinutes > 0) {
    return t('common.time.minutesAgo', { count: diffMinutes });
  }
  return t('common.time.justNow');
}

export default formatRelativeDate;