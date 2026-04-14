import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AvatarCircleProps {
  name: string;
  color: string;
  size?: number;
}

export default function AvatarCircle({ name, color, size = 80 }: AvatarCircleProps) {
  const initial = name.trim().charAt(0).toUpperCase();
  const fontSize = size * 0.42;

  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
      ]}
    >
      <Text style={[styles.initial, { fontSize }]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  initial: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
});
