import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n/useTranslation';
import { RootStackParamList } from '../navigation/AppNavigator';
import AvatarCircle from '../components/AvatarCircle';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const { profiles, setActiveProfile, loaded, language, setLanguage } = useApp();
  const t = useTranslation();

  const titleScale = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(titleScale, {
          toValue: 1,
          friction: 4,
          tension: 150,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(listOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [titleScale, titleOpacity, listOpacity]);

  const handleSelectProfile = (profileId: string) => {
    const profile = profiles.find((p) => p.id === profileId);
    if (profile) {
      setActiveProfile(profile);
      navigation.navigate('ModuleSelect', { profileId });
    }
  };

  if (!loaded) {
    return (
      <LinearGradient colors={['#667EEA', '#764BA2']} style={styles.loadingContainer}>
        <Text style={styles.loadingText}>🌟</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#667EEA', '#764BA2']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.langButton}
            onPress={() => setLanguage(language === 'en' ? 'es' : 'en')}
            activeOpacity={0.8}
          >
            <Text style={styles.langText}>{language === 'en' ? '🇪🇸 ES' : '🇺🇸 EN'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.parentButton}
            onPress={() => navigation.navigate('ParentDashboard')}
            activeOpacity={0.8}
          >
            <Text style={styles.parentButtonText}>🔒</Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.titleContainer,
            { transform: [{ scale: titleScale }], opacity: titleOpacity },
          ]}
        >
          <Text style={styles.titleEmoji}>🌍</Text>
          <Text style={styles.titleText}>Warpos World</Text>
          <Text style={styles.subtitleText}>{t.whoLearning}</Text>
        </Animated.View>

        <Animated.View style={[styles.profilesSection, { opacity: listOpacity }]}>
          <ScrollView
            contentContainerStyle={styles.profilesGrid}
            showsVerticalScrollIndicator={false}
          >
            {profiles.map((profile) => (
              <TouchableOpacity
                key={profile.id}
                style={styles.profileButton}
                onPress={() => handleSelectProfile(profile.id)}
                activeOpacity={0.85}
              >
                <AvatarCircle name={profile.name} color={profile.avatarColor} size={100} />
                <Text style={styles.profileName}>{profile.name}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('ProfileSetup', {})}
              activeOpacity={0.85}
            >
              <View style={styles.addCircle}>
                <Text style={styles.addIcon}>+</Text>
              </View>
              <Text style={styles.addText}>{t.addKid}</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>

        {profiles.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>👋</Text>
            <Text style={styles.emptyText}>{t.tapToStart}</Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 80,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  langButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  langText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  parentButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentButtonText: {
    fontSize: 26,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
    gap: 6,
  },
  titleEmoji: {
    fontSize: 72,
    lineHeight: 86,
  },
  titleText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitleText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  },
  profilesSection: {
    flex: 1,
  },
  profilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    paddingBottom: 40,
  },
  profileButton: {
    alignItems: 'center',
    gap: 10,
    minWidth: 120,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  addButton: {
    alignItems: 'center',
    gap: 10,
    minWidth: 120,
  },
  addCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.6)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 52,
    color: '#FFFFFF',
    fontWeight: '300',
    lineHeight: 62,
  },
  addText: {
    fontSize: 22,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingBottom: 60,
    gap: 12,
  },
  emptyEmoji: {
    fontSize: 56,
  },
  emptyText: {
    fontSize: 22,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    textAlign: 'center',
  },
});
