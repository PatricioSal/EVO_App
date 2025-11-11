import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system/legacy';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Validate that email and password are not empty
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    // Check for admin credentials (hardcoded)
    const ADMIN_EMAIL = 'admin@evo.app';
    const ADMIN_PASSWORD = 'admin123';
    
    if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      // Admin login - bypass 2FA and go directly to admin panel
      Alert.alert('Success', 'Admin login successful!');
      navigation.navigate('AdminTabs');
      return;
    }

    try {
      // Read the users.txt file from document directory (runtime storage)
      const fileUri = `${FileSystem.documentDirectory}users.txt`;
      
      // Check if file exists, if not initialize from project file or default
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      let fileContent = '';
      
      if (fileInfo.exists) {
        fileContent = await FileSystem.readAsStringAsync(fileUri);
      } else {
        // Initialize with default user from project users.txt
        // Note: In production, you might want to copy from bundled asset
        fileContent = 'test@example.com:1234\n';
        await FileSystem.writeAsStringAsync(fileUri, fileContent);
      }
      const lines = fileContent.trim().split('\n').filter(line => {
        const trimmed = line.trim();
        return trimmed && !trimmed.startsWith('#'); // Skip empty lines and comments
      });

      // Check if credentials match
      let matchedEmail = '';
      const credentialsMatch = lines.some(line => {
        const [storedEmail, storedPassword] = line.split(':');
        if (storedEmail.trim() === email.trim() && storedPassword.trim() === password.trim()) {
          matchedEmail = storedEmail.trim();
          return true;
        }
        return false;
      });

      if (credentialsMatch) {
        // Generate 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        try {
          // Send verification code via email
          const response = await fetch('http://localhost:3001/send-2fa-code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: matchedEmail,
              code: verificationCode,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            // Navigate to 2FA screen
            navigation.navigate('TwoFactorAuth', {
              email: matchedEmail,
              verificationCode: verificationCode,
            });
          } else {
            // If server fails, still allow login (for development)
            console.warn('Failed to send 2FA code, allowing login anyway');
            Alert.alert('Success', 'Login successful!');
            navigation.navigate('MainTabs');
          }
        } catch (error) {
          // If server not running, generate code and show it (for development)
          console.error('2FA server error:', error);
          console.log(`\n═══════════════════════════════════════════`);
          console.log(`2FA Code for ${matchedEmail}: ${verificationCode}`);
          console.log(`═══════════════════════════════════════════\n`);
          
          Alert.alert(
            '2FA Code', 
            `Verification code: ${verificationCode}\n\n(Server not running - using console for development)`,
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('TwoFactorAuth', {
                    email: matchedEmail,
                    verificationCode: verificationCode,
                  });
                }
              }
            ]
          );
        }
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to read user data. Please try again.');
    }
  };

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

      {/* Forgot Password — moved under password input, aligned right */}
      <TouchableOpacity
        style={styles.forgotContainer}
        onPress={() => navigation.navigate('ChangePassword')}
      >
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Bottom Text */}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
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
    width: 250,
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
  forgotContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 4,
    marginBottom: 20,
  },
  forgotText: {
    color: '#A9ECA2',
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