import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system/legacy';

export default function ChangePasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    // Validate inputs
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    if (!newPassword.trim()) {
      Alert.alert('Error', 'Please enter a new password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    if (newPassword.length < 4) {
      Alert.alert('Error', 'Password should be at least 4 characters.');
      return;
    }

    try {
      // Read the users.txt file from document directory (runtime storage)
      const fileUri = `${FileSystem.documentDirectory}users.txt`;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      
      if (!fileInfo.exists) {
        Alert.alert('Error', 'No users found. Please sign up first.');
        return;
      }

      let fileContent = await FileSystem.readAsStringAsync(fileUri);
      const lines = fileContent.split('\n');
      
      // Find and update the user's password
      let userFound = false;
      const updatedLines = lines.map(line => {
        const trimmed = line.trim();
        // Skip empty lines and comments
        if (!trimmed || trimmed.startsWith('#')) {
          return line;
        }
        
        const [storedEmail, storedPassword] = trimmed.split(':');
        if (storedEmail && storedEmail.trim().toLowerCase() === email.trim().toLowerCase()) {
          userFound = true;
          return `${storedEmail.trim()}:${newPassword.trim()}`;
        }
        return line;
      });

      if (!userFound) {
        Alert.alert('Error', 'Email not found. Please check your email address.');
        return;
      }

      // Write updated content back to file
      const updatedContent = updatedLines.join('\n');
      await FileSystem.writeAsStringAsync(fileUri, updatedContent);

      // Also try to update the project file via sync server (optional)
      try {
        await fetch('http://localhost:3001/update-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            newPassword: newPassword.trim(),
          }),
        });
      } catch (error) {
        // Server not running is okay, we already updated runtime storage
        console.log('Sync server not available, password updated in runtime storage only');
      }

      Alert.alert('Success', 'Your password has been changed successfully.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Change password error:', error);
      Alert.alert('Error', 'Failed to change password. Please try again.');
    }
  };

  return (
    <LinearGradient
      colors={['#15262B', '#1E2B2F', '#0F1A1C']} // Dark teal → dark green
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.subtitle}>Enter your email and new password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#A9ECA2"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="New password"
        placeholderTextColor="#A9ECA2"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm new password"
        placeholderTextColor="#A9ECA2"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#C8E6C9',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#A9ECA2',
    fontSize: 14,
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#30503B', // dark green input
    borderColor: '#A9ECA2',
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#3E662F',
    borderRadius: 10,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backText: {
    color: '#A9ECA2',
    fontSize: 14,
    marginTop: 15,
  },
});