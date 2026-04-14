export interface ColorItem {
  name: string;
  hex: string;
  emoji: string;
  items: string;
}

export const COLORS: ColorItem[] = [
  { name: 'Red', hex: '#FF3B30', emoji: '🔴', items: '🍎 🌹 🍓' },
  { name: 'Blue', hex: '#007AFF', emoji: '🔵', items: '🌊 🫐 💙' },
  { name: 'Yellow', hex: '#FFD60A', emoji: '🟡', items: '🌟 🍋 🌻' },
  { name: 'Green', hex: '#34C759', emoji: '🟢', items: '🌿 🐸 🥦' },
  { name: 'Orange', hex: '#FF9500', emoji: '🟠', items: '🍊 🎃 🦊' },
  { name: 'Purple', hex: '#AF52DE', emoji: '🟣', items: '🍇 🦄 💜' },
  { name: 'Pink', hex: '#FF2D55', emoji: '🩷', items: '🌸 🍭 🐷' },
  { name: 'White', hex: '#F2F2F7', emoji: '⬜', items: '☁️ 🐑 🤍' },
];
