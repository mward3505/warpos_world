import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressDotsProps {
  total: number;
  current: number;
  activeColor?: string;
  inactiveColor?: string;
}

export default function ProgressDots({
  total,
  current,
  activeColor = '#FFFFFF',
  inactiveColor = 'rgba(255,255,255,0.35)',
}: ProgressDotsProps) {
  const MAX_VISIBLE = 10;
  const displayTotal = Math.min(total, MAX_VISIBLE);
  const displayCurrent = Math.min(current, displayTotal);

  return (
    <View style={styles.container}>
      {Array.from({ length: displayTotal }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              backgroundColor: i < displayCurrent ? activeColor : inactiveColor,
              width: i < displayCurrent ? 12 : 10,
              height: i < displayCurrent ? 12 : 10,
              borderRadius: 6,
            },
          ]}
        />
      ))}
      {total > MAX_VISIBLE && (
        <View style={[styles.dot, { backgroundColor: inactiveColor, width: 10, height: 10, borderRadius: 5 }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  dot: {
    margin: 2,
  },
});
