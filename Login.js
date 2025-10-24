import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LinearGradient
      colors={['#15262B', '#1E2B2F', '#0F1A1C']} // gradient colors (dark teal to dark green)
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('./assets/EvoImg-Photoroom.png')} style={styles.logo} />
        {/*<Text style={styles.logoText}>EVO</Text>*/}
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome!</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#000"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#000"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Bottom Text */}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Challenge')}>
          <Text style={styles.signUpText}>Sign Up Now</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
  position: 'absolute',
  top: 100, // adjust as needed
  alignItems: 'center',
  width: '100%',
  },
  logo: {
    width: 250, // smaller so it doesn't dominate
    height: 250,
  },
  logoText: {
    fontSize: 36,
    color: '#40C032',
    fontWeight: 'bold',
  },
  welcomeText: {
    color: '#C8E6C9',
    fontSize: 26,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#30503B',
    borderColor: '#A9ECA2',
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
    color: '#000',
    marginVertical: 8,
  },
  forgotText: {
    alignSelf: 'flex-end',
    color: '#A9ECA2',
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#3E662F',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
  },
  bottomText: {
    color: '#fff',
  },
  signUpText: {
    color: '#A9ECA2',
    fontWeight: '500',
  },
});