import { useApp } from '../context/AppContext';
import { translations, Translations } from './translations';

export function useTranslation(): Translations {
  const { language } = useApp();
  return translations[language];
}
