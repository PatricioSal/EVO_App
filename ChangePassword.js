import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ChangePasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleVerify = () => {
    if (email === 'test@example.com' && securityAnswer.toLowerCase() === 'drums') {
      Alert.alert('Verification Successful', 'You may now set a new password.');
    } else {
      Alert.alert('Verification Failed', 'Invalid email or answer.');
    }
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    if (newPassword.length < 4) {
      Alert.alert('Error', 'Password should be at least 4 characters.');
      return;
    }
    Alert.alert('Success', 'Your password has been changed successfully.');
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={['#15262B', '#1E2B2F', '#0F1A1C']} // Dark teal → dark green
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Change Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#000"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="What’s your favorite instrument?"
        placeholderTextColor="#000"
        value={securityAnswer}
        onChangeText={setSecurityAnswer}
      />

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify Identity</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="New password"
        placeholderTextColor="#000"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm new password"
        placeholderTextColor="#000"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Save New Password</Text>
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
    marginBottom: 25,
  },
  input: {
    width: '100%',
    backgroundColor: '#30503B', // dark green input
    borderColor: '#A9ECA2',
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
    color: '#000',
    marginBottom: 12,
  },
  verifyButton: {
    backgroundColor: '#3E662F',
    borderRadius: 10,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
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