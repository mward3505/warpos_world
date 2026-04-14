import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ModuleType } from '../context/AppContext';

import HomeScreen from '../screens/HomeScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import ModuleSelectScreen from '../screens/ModuleSelectScreen';
import LearningScreen from '../screens/LearningScreen';
import QuizScreen from '../screens/QuizScreen';
import ColorHopScreen from '../screens/ColorHopScreen';
import ParentDashboard from '../screens/ParentDashboard';

export type RootStackParamList = {
  Home: undefined;
  ProfileSetup: { profileId?: string } | undefined;
  ModuleSelect: { profileId: string };
  Learning: { moduleType: ModuleType; profileId: string };
  Quiz: { moduleType: ModuleType; profileId: string };
  ColorHop: { profileId: string };
  ParentDashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false, animation: 'fade' }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="ModuleSelect" component={ModuleSelectScreen} />
        <Stack.Screen name="Learning" component={LearningScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="ColorHop" component={ColorHopScreen} />
        <Stack.Screen name="ParentDashboard" component={ParentDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
