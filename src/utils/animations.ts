import { Animated, Easing } from 'react-native';

export function bounceIn(animValue: Animated.Value, toValue = 1): Animated.CompositeAnimation {
  return Animated.spring(animValue, {
    toValue,
    friction: 3,
    tension: 200,
    useNativeDriver: true,
  });
}

export function bounceOut(animValue: Animated.Value): Animated.CompositeAnimation {
  return Animated.spring(animValue, {
    toValue: 0,
    friction: 5,
    tension: 150,
    useNativeDriver: true,
  });
}

export function pulse(animValue: Animated.Value): Animated.CompositeAnimation {
  return Animated.sequence([
    Animated.timing(animValue, {
      toValue: 1.15,
      duration: 120,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }),
    Animated.spring(animValue, {
      toValue: 1,
      friction: 3,
      tension: 200,
      useNativeDriver: true,
    }),
  ]);
}

export function shakeAnimation(animValue: Animated.Value): Animated.CompositeAnimation {
  return Animated.sequence([
    Animated.timing(animValue, { toValue: 12, duration: 60, useNativeDriver: true }),
    Animated.timing(animValue, { toValue: -12, duration: 60, useNativeDriver: true }),
    Animated.timing(animValue, { toValue: 10, duration: 60, useNativeDriver: true }),
    Animated.timing(animValue, { toValue: -10, duration: 60, useNativeDriver: true }),
    Animated.timing(animValue, { toValue: 6, duration: 60, useNativeDriver: true }),
    Animated.timing(animValue, { toValue: -6, duration: 60, useNativeDriver: true }),
    Animated.timing(animValue, { toValue: 0, duration: 60, useNativeDriver: true }),
  ]);
}

export function fadeIn(animValue: Animated.Value, duration = 300): Animated.CompositeAnimation {
  return Animated.timing(animValue, {
    toValue: 1,
    duration,
    useNativeDriver: true,
    easing: Easing.out(Easing.ease),
  });
}

export function fadeOut(animValue: Animated.Value, duration = 300): Animated.CompositeAnimation {
  return Animated.timing(animValue, {
    toValue: 0,
    duration,
    useNativeDriver: true,
    easing: Easing.in(Easing.ease),
  });
}
