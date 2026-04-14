import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useTranslation } from '../i18n/useTranslation';

const { width, height } = Dimensions.get('window');

const PARTICLE_COLORS = [
  '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF',
  '#FF6FC8', '#A855F7', '#F97316', '#06B6D4',
  '#10B981', '#EF4444', '#F59E0B', '#8B5CF6',
];

const PARTICLE_EMOJIS = ['⭐', '🌟', '✨', '💫', '🎉', '🎊', '⭐', '🌟'];

const NUM_PARTICLES = 18;

interface Particle {
  translateX: Animated.Value;
  translateY: Animated.Value;
  scale: Animated.Value;
  opacity: Animated.Value;
  angle: number;
  distance: number;
  emoji: string;
  color: string;
}

interface CelebrationOverlayProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function CelebrationOverlay({ visible, onDismiss }: CelebrationOverlayProps) {
  const t = useTranslation();
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0)).current;
  const titleBounce = useRef(new Animated.Value(0)).current;

  const particles = useRef<Particle[]>(
    Array.from({ length: NUM_PARTICLES }).map((_, i) => ({
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
      angle: (i / NUM_PARTICLES) * 2 * Math.PI + Math.random() * 0.5,
      distance: 120 + Math.random() * 160,
      emoji: PARTICLE_EMOJIS[i % PARTICLE_EMOJIS.length],
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    }))
  ).current;

  useEffect(() => {
    if (!visible) {
      overlayOpacity.setValue(0);
      titleScale.setValue(0);
      titleBounce.setValue(0);
      particles.forEach((p) => {
        p.translateX.setValue(0);
        p.translateY.setValue(0);
        p.scale.setValue(0);
        p.opacity.setValue(0);
      });
      return;
    }

    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.spring(titleScale, {
      toValue: 1,
      friction: 3,
      tension: 200,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(titleBounce, {
          toValue: -20,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(titleBounce, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 4 }
    ).start();

    const particleAnimations = particles.map((p) => {
      const destX = Math.cos(p.angle) * p.distance;
      const destY = Math.sin(p.angle) * p.distance;

      return Animated.parallel([
        Animated.timing(p.translateX, {
          toValue: destX,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(p.translateY, {
          toValue: destY,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.spring(p.scale, {
            toValue: 1.2,
            friction: 4,
            tension: 200,
            useNativeDriver: true,
          }),
          Animated.timing(p.scale, {
            toValue: 0,
            duration: 400,
            delay: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(p.opacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(p.opacity, {
            toValue: 0,
            duration: 400,
            delay: 500,
            useNativeDriver: true,
          }),
        ]),
      ]);
    });

    Animated.parallel(particleAnimations).start();

    const timer = setTimeout(() => {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        onDismiss();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [visible, overlayOpacity, titleScale, titleBounce, particles, onDismiss]);

  if (!visible) return null;

  const cx = width / 2;
  const cy = height / 2;

  return (
    <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          style={[
            styles.particle,
            {
              left: cx - 20,
              top: cy - 20,
              transform: [
                { translateX: p.translateX },
                { translateY: p.translateY },
                { scale: p.scale },
              ],
              opacity: p.opacity,
            },
          ]}
        >
          <Text style={styles.particleEmoji}>{p.emoji}</Text>
        </Animated.View>
      ))}

      <Animated.View
        style={[
          styles.titleContainer,
          {
            transform: [
              { scale: titleScale },
              { translateY: titleBounce },
            ],
          },
        ]}
      >
        <Text style={styles.titleText}>{t.greatJob}</Text>
        <Text style={styles.subtitleText}>{t.youDidIt}</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  particle: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  particleEmoji: {
    fontSize: 28,
  },
  titleContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 32,
    paddingVertical: 36,
    paddingHorizontal: 52,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    gap: 8,
  },
  titleText: {
    fontSize: 52,
    fontWeight: '900',
    color: '#1A1A2E',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#555',
    textAlign: 'center',
  },
});
