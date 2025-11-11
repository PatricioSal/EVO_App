import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import LoginScreen from './Login'; // your login page
import ChangePasswordScreen from './ChangePassword';
import ChallengeScreen from './Challenge'; // ✅ added import
import CameraScreen from './CameraScreen';
import PostPreview from './PostPreview';
import VideoFeed from './Video';
import SignupScreen from './Signup';
import TwoFactorAuthScreen from './TwoFactorAuth';
import AdminSettings from './AdminSettings';
import ViewUsersScreen from './ViewUsers';
import DeleteUserScreen from './DeleteUser';
import UserStatisticsScreen from './UserStatistics';
import SystemLogsScreen from './SystemLogs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TwoFactorAuth" component={TwoFactorAuthScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="AdminTabs" component={AdminTabs} />
        <Stack.Screen name="ViewUsers" component={ViewUsersScreen} />
        <Stack.Screen name="DeleteUser" component={DeleteUserScreen} />
        <Stack.Screen name="UserStatistics" component={UserStatisticsScreen} />
        <Stack.Screen name="SystemLogs" component={SystemLogsScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="Challenge" component={ChallengeScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="PostPreview" component={PostPreview} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Bottom Tab Navigator for Regular Users
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#40C032',
          borderRadius: 15,
          position: 'absolute',
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#000000',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Video" component={VideoFeed} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Admin Tab Navigator
function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1E88E5',
          borderRadius: 15,
          position: 'absolute',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#ffffff',
      }}
    >
      <Tab.Screen 
        name="AdminHome" 
        component={AdminHomeScreen}
        options={{
          title: 'Admin Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="AdminSettings" 
        component={AdminSettings}
        options={{
          title: 'Admin Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Admin Home Screen
function AdminHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Admin Dashboard</Text>
      <Text style={[styles.text, { fontSize: 16, marginTop: 10 }]}>
        Welcome to the Admin Panel
      </Text>
    </View>
  );
}

// Settings screen
function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23353A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});