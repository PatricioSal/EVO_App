import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ChangePasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleVerify = () => {
    // Simulated verification (you'd normally check this on your backend)
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

    // Simulate password update success
    Alert.alert('Success', 'Your password has been changed successfully.');
    navigation.navigate('Login'); // Go back to Login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="What’s your favorite instrument?"
        placeholderTextColor="#999"
        value={securityAnswer}
        onChangeText={setSecurityAnswer}
      />

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify Identity</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="New password"
        placeholderTextColor="#999"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm new password"
        placeholderTextColor="#999"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23353A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    marginBottom: 25,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: '#000',
  },
  verifyButton: {
    backgroundColor: '#40C032',
    borderRadius: 8,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#0072FF',
    borderRadius: 8,
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
    color: '#40C032',
    fontSize: 14,
    marginTop: 15,
  },
});