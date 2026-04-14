import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

interface PinPadProps {
  pin: string;
  onDigit: (digit: string) => void;
  onBackspace: () => void;
}

const BUTTONS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', '⌫'],
];

export default function PinPad({ pin, onDigit, onBackspace }: PinPadProps) {
  const buttonScales = useRef(
    Array.from({ length: 12 }).map(() => new Animated.Value(1))
  ).current;

  const handlePress = (value: string, index: number) => {
    Animated.sequence([
      Animated.timing(buttonScales[index], {
        toValue: 0.88,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScales[index], {
        toValue: 1,
        friction: 3,
        tension: 300,
        useNativeDriver: true,
      }),
    ]).start();

    if (value === '⌫') {
      onBackspace();
    } else if (value !== '') {
      onDigit(value);
    }
  };

  let btnIndex = 0;

  return (
    <View style={styles.container}>
      <View style={styles.dotsRow}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i < pin.length ? styles.dotFilled : styles.dotEmpty,
            ]}
          />
        ))}
      </View>

      <View style={styles.grid}>
        {BUTTONS.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.row}>
            {row.map((btn) => {
              const currentIndex = btnIndex++;
              return (
                <Animated.View
                  key={btn || `empty-${rowIdx}`}
                  style={[
                    styles.buttonWrapper,
                    { transform: [{ scale: buttonScales[currentIndex] }] },
                  ]}
                >
                  {btn === '' ? (
                    <View style={styles.emptyButton} />
                  ) : (
                    <TouchableOpacity
                      style={[
                        styles.button,
                        btn === '⌫' && styles.backspaceButton,
                      ]}
                      onPress={() => handlePress(btn, currentIndex)}
                      activeOpacity={0.85}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          btn === '⌫' && styles.backspaceText,
                        ]}
                      >
                        {btn}
                      </Text>
                    </TouchableOpacity>
                  )}
                </Animated.View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  dotFilled: {
    backgroundColor: '#FFFFFF',
  },
  dotEmpty: {
    backgroundColor: 'transparent',
  },
  grid: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonWrapper: {
    width: 80,
    height: 80,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  backspaceButton: {
    backgroundColor: 'rgba(255,100,100,0.3)',
    borderColor: 'rgba(255,100,100,0.5)',
  },
  emptyButton: {
    width: 80,
    height: 80,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  backspaceText: {
    fontSize: 26,
  },
});
