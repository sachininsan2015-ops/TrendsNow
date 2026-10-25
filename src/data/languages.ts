import type { Language } from '@/types';

export const LANGUAGES: Language[] = [
  { id: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { id: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { id: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { id: 'fr', label: 'French', native: 'Français', flag: '🇫🇷' },
  { id: 'ja', label: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { id: 'de', label: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { id: 'zh', label: 'Chinese (Simplified)', native: '简体中文', flag: '🇨🇳' },
  { id: 'ar', label: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { id: 'ru', label: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { id: 'pt', label: 'Portuguese', native: 'Português', flag: '🇵🇹' },
  { id: 'it', label: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { id: 'ko', label: 'Korean', native: '한국어', flag: '🇰🇷' },
  { id: 'tr', label: 'Turkish', native: 'Türkçe', flag: '🇹🇷' },
  { id: 'id', label: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩' },
  { id: 'vi', label: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
  { id: 'pl', label: 'Polish', native: 'Polski', flag: '🇵🇱' },
  { id: 'nl', label: 'Dutch', native: 'Nederlands', flag: '🇳🇱' },
  { id: 'tl', label: 'Tagalog', native: 'Tagalog', flag: '🇵🇭' },
  { id: 'th', label: 'Thai', native: 'ไทย', flag: '🇹🇭' },
  { id: 'bn', label: 'Bengali', native: 'বাংলা', flag: '🇧🇩' },
  { id: 'fa', label: 'Persian', native: 'فارسی', flag: '🇮🇷' },
  { id: 'uk', label: 'Ukrainian', native: 'Українська', flag: '🇺🇦' },
  { id: 'ms', label: 'Malay', native: 'Bahasa Melayu', flag: '🇲🇾' },
  { id: 'sv', label: 'Swedish', native: 'Svenska', flag: '🇸🇪' },
  { id: 'no', label: 'Norwegian', native: 'Norsk', flag: '🇳🇴' },
  { id: 'fi', label: 'Finnish', native: 'Suomi', flag: '🇫🇮' },
  { id: 'da', label: 'Danish', native: 'Dansk', flag: '🇩🇰' },
  { id: 'cs', label: 'Czech', native: 'Čeština', flag: '🇨🇿' },
  { id: 'ro', label: 'Romanian', native: 'Română', flag: '🇷🇴' },
  { id: 'el', label: 'Greek', native: 'Ελληνικά', flag: '🇬🇷' },
];

export const LANG_MAP: Record<string, Language> = Object.fromEntries(
  LANGUAGES.map((l) => [l.id, l]),
);
