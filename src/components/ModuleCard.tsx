import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from '../i18n/useTranslation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// 20px padding each side + 16px gap between columns
const CARD_WIDTH = Math.floor((SCREEN_WIDTH - 56) / 2);
const CARD_HEIGHT = Math.floor(CARD_WIDTH * 1.05);

interface ModuleCardProps {
  title: string;
  emoji: string;
  gradientColors: readonly [string, string, ...string[]];
  completedCount: number;
  totalCount: number;
  onPress: () => void;
}

export default function ModuleCard({
  title,
  emoji,
  gradientColors,
  completedCount,
  totalCount,
  onPress,
}: ModuleCardProps) {
  const t = useTranslation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 5,
      tension: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 200,
      useNativeDriver: true,
    }).start();
  };

  const progress = totalCount > 0 ? completedCount / totalCount : 0;
  const isComplete = completedCount >= totalCount && totalCount > 0;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.touchable}
    >
      <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}>
        <LinearGradient colors={gradientColors} style={styles.card} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.title}>{title}</Text>
          {isComplete && <Text style={styles.completeBadge}>{t.completedBadge}</Text>}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {completedCount}/{totalCount}
          </Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 6,
  },
  emoji: {
    fontSize: 42,
    lineHeight: 52,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1A1A2E',
    textAlign: 'center',
  },
  completeBadge: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  progressBarBg: {
    width: '75%',
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 2,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.55)',
  },
});