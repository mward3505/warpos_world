import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PinPad from '../components/PinPad';
import { shakeAnimation } from '../utils/animations';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n/useTranslation';

const MAX_ATTEMPTS = 3;

interface PinScreenProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function PinScreen({ onSuccess, onCancel }: PinScreenProps) {
  const { parentPin } = useApp();
  const t = useTranslation();
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [locked, setLocked] = useState(false);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(1)).current;

  const handleDigit = useCallback(
    (digit: string) => {
      if (locked || pin.length >= 4) return;

      const newPin = pin + digit;
      setPin(newPin);
      setErrorMessage('');

      if (newPin.length === 4) {
        if (newPin === parentPin) {
          Animated.sequence([
            Animated.spring(successScale, {
              toValue: 1.15,
              friction: 3,
              tension: 300,
              useNativeDriver: true,
            }),
            Animated.spring(successScale, {
              toValue: 1,
              friction: 3,
              tension: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            onSuccess();
            setPin('');
          });
        } else {
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);

          shakeAnimation(shakeAnim).start(() => {
            setPin('');
          });

          if (newAttempts >= MAX_ATTEMPTS) {
            setLocked(true);
            setErrorMessage(t.tooManyTries);
            setTimeout(() => {
              setLocked(false);
              setAttempts(0);
              setErrorMessage('');
            }, 30000);
          } else {
            setErrorMessage(t.wrongPin(MAX_ATTEMPTS - newAttempts));
          }
        }
      }
    },
    [pin, locked, attempts, parentPin, shakeAnim, successScale, onSuccess]
  );

  const handleBackspace = useCallback(() => {
    if (locked) return;
    setPin((prev) => prev.slice(0, -1));
    setErrorMessage('');
  }, [locked]);

  return (
    <LinearGradient colors={['#2D3748', '#4A5568']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <Animated.View
          style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}
        >
          <Text style={styles.lockEmoji}>🔒</Text>
          <Text style={styles.title}>{t.parentArea}</Text>
          <Text style={styles.subtitle}>{t.enterPin}</Text>

          <Animated.View style={{ transform: [{ scale: successScale }] }}>
            <PinPad
              pin={pin}
              onDigit={handleDigit}
              onBackspace={handleBackspace}
            />
          </Animated.View>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          {onCancel ? (
            <Text style={styles.cancelText} onPress={onCancel}>
              {t.cancel}
            </Text>
          ) : null}
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 32,
  },
  lockEmoji: {
    fontSize: 64,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FC8181',
    textAlign: 'center',
    backgroundColor: 'rgba(252,129,129,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
  },
  cancelText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
    marginTop: 8,
    paddingVertical: 8,
  },
});
