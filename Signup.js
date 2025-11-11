import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system/legacy';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    // Validate inputs
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Check password length
    if (password.length < 4) {
      Alert.alert('Error', 'Password must be at least 4 characters long');
      return;
    }

    try {
      const fileUri = `${FileSystem.documentDirectory}users.txt`;
      
      // Check if file exists, if not create it
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      let fileContent = '';
      
      if (fileInfo.exists) {
        fileContent = await FileSystem.readAsStringAsync(fileUri);
      } else {
        // Initialize with default user
        fileContent = 'test@example.com:1234\n';
      }

      // Check if email already exists
      const lines = fileContent.trim().split('\n').filter(line => {
        const trimmed = line.trim();
        return trimmed && !trimmed.startsWith('#'); // Skip empty lines and comments
      });
      const emailExists = lines.some(line => {
        const [storedEmail] = line.split(':');
        return storedEmail.trim().toLowerCase() === email.trim().toLowerCase();
      });

      if (emailExists) {
        Alert.alert('Error', 'An account with this email already exists');
        return;
      }

      // Add new user to file
      const newUser = `${email.trim()}:${password.trim()}\n`;
      const updatedContent = fileContent + newUser;
      
      await FileSystem.writeAsStringAsync(fileUri, updatedContent);

      // Try to sync to project users.txt file via local server
      try {
        // For development: try to save to project file via local server
        // Make sure userSyncServer.js is running: node userSyncServer.js
        const response = await fetch('http://localhost:3001/add-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
          }),
        });

        if (response.ok) {
          console.log('✓ User automatically saved to project users.txt file');
        } else {
          console.log('⚠ Could not connect to sync server. User saved to runtime storage only.');
          console.log('💡 To enable auto-save, run: node userSyncServer.js');
        }
      } catch (error) {
        // Server not running is fine - user is still saved to runtime storage
        console.log('⚠ Sync server not running. User saved to runtime storage only.');
        console.log('💡 To enable auto-save to project file, run: node userSyncServer.js');
      }

      Alert.alert('Success', 'Account created successfully! Please login.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <LinearGradient
      colors={['#15262B', '#1E2B2F', '#0F1A1C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('./assets/EvoImg-Photoroom.png')} style={styles.logo} />
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Create Account</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#000"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
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

      {/* Confirm Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#000"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Signup Button */}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignup}
      >
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Bottom Text */}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
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
    top: 100,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 250,
    height: 250,
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
  signupButton: {
    width: '100%',
    backgroundColor: '#3E662F',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  signupText: {
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
  loginText: {
    color: '#A9ECA2',
    fontWeight: '500',
  },
});

