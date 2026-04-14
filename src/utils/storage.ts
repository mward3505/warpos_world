import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile, ProgressData } from '../context/AppContext';
import { Language } from '../i18n/translations';

const PROFILES_KEY  = '@wards_world_profiles';
const PROGRESS_KEY  = '@wards_world_progress';
const PIN_KEY       = '@wards_world_pin';
const LANGUAGE_KEY  = '@wards_world_language';
const DEFAULT_PIN   = '1234';

export async function loadProfiles(): Promise<Profile[]> {
  try {
    const raw = await AsyncStorage.getItem(PROFILES_KEY);
    if (raw) {
      return JSON.parse(raw) as Profile[];
    }
    return [];
  } catch {
    return [];
  }
}

export async function saveProfiles(profiles: Profile[]): Promise<void> {
  try {
    await AsyncStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  } catch {
    // silently fail — app still works without persistence
  }
}

export async function loadProgress(): Promise<ProgressData> {
  try {
    const raw = await AsyncStorage.getItem(PROGRESS_KEY);
    if (raw) {
      return JSON.parse(raw) as ProgressData;
    }
    return {};
  } catch {
    return {};
  }
}

export async function saveProgress(progress: ProgressData): Promise<void> {
  try {
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // silently fail
  }
}

export async function loadPin(): Promise<string> {
  try {
    const raw = await AsyncStorage.getItem(PIN_KEY);
    return raw ?? DEFAULT_PIN;
  } catch {
    return DEFAULT_PIN;
  }
}

export async function savePin(pin: string): Promise<void> {
  try {
    await AsyncStorage.setItem(PIN_KEY, pin);
  } catch {
    // silently fail
  }
}

export async function loadLanguage(): Promise<Language> {
  try {
    const raw = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (raw === 'en' || raw === 'es') return raw;
    return 'en';
  } catch {
    return 'en';
  }
}

export async function saveLanguage(lang: Language): Promise<void> {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  } catch {
    // silently fail
  }
}
