import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TwoFactorAuthScreen({ route, navigation }) {
  const { email, verificationCode: initialCode } = route.params;
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [verificationCode, setVerificationCode] = useState(initialCode);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (text, index) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    
    if (numericText.length <= 1) {
      const newCode = [...code];
      newCode[index] = numericText;
      setCode(newCode);

      // Auto-focus next input
      if (numericText && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace to go to previous input
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredCode = code.join('');
    
    if (enteredCode.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit code');
      return;
    }

    if (enteredCode === verificationCode) {
      Alert.alert('Success', 'Verification successful!');
      navigation.replace('MainTabs');
    } else {
      Alert.alert('Error', 'Invalid verification code. Please try again.');
      // Clear the code inputs
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      // Generate new code
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Send new code via email
      try {
        const response = await fetch('http://localhost:3001/send-2fa-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            code: newCode,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          Alert.alert('Success', 'New verification code sent to your email');
          // Update the verification code state
          setVerificationCode(newCode);
          setTimeLeft(300); // Reset timer
          // Clear entered code
          setCode(['', '', '', '', '', '']);
          inputRefs.current[0]?.focus();
        } else {
          // If server responds with error, still allow resend with new code
          console.warn('Server error, but generating new code anyway');
          Alert.alert(
            'New Code Generated', 
            `New verification code: ${newCode}\n\n(Server not responding - code shown here for development)`,
            [
              {
                text: 'OK',
                onPress: () => {
                  setVerificationCode(newCode);
                  setTimeLeft(300);
                  setCode(['', '', '', '', '', '']);
                  inputRefs.current[0]?.focus();
                }
              }
            ]
          );
        }
      } catch (fetchError) {
        // Server not running - show code in alert for development
        console.error('Resend fetch error:', fetchError);
        console.log(`\n═══════════════════════════════════════════`);
        console.log(`NEW 2FA Code for ${email}: ${newCode}`);
        console.log(`═══════════════════════════════════════════\n`);
        
        Alert.alert(
          'New Code Generated', 
          `New verification code: ${newCode}\n\n(Server not running - check console for development)`,
          [
            {
              text: 'OK',
              onPress: () => {
                setVerificationCode(newCode);
                setTimeLeft(300);
                setCode(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Resend error:', error);
      Alert.alert('Error', 'Failed to generate new code. Please try again.');
    } finally {
      setIsResending(false);
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

      {/* Title */}
      <Text style={styles.title}>Two-Factor Authentication</Text>
      <Text style={styles.subtitle}>
        We've sent a verification code to{'\n'}
        <Text style={styles.emailText}>{email}</Text>
      </Text>

      {/* Code Input Fields */}
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.codeInput}
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
            textAlign="center"
          />
        ))}
      </View>

      {/* Timer */}
      <Text style={styles.timerText}>
        {timeLeft > 0 ? `Code expires in ${formatTime(timeLeft)}` : 'Code expired'}
      </Text>

      {/* Verify Button */}
      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleVerify}
      >
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      {/* Resend Code */}
      <TouchableOpacity
        style={styles.resendButton}
        onPress={handleResendCode}
        disabled={isResending}
      >
        <Text style={[styles.resendText, isResending && styles.resendTextDisabled]}>
          {isResending ? 'Sending...' : 'Resend Code'}
        </Text>
      </TouchableOpacity>

      {/* Back to Login */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
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
    top: 80,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    color: '#C8E6C9',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  emailText: {
    color: '#A9ECA2',
    fontWeight: 'bold',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  codeInput: {
    width: 45,
    height: 60,
    backgroundColor: '#30503B',
    borderColor: '#A9ECA2',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  timerText: {
    color: '#A9ECA2',
    fontSize: 14,
    marginBottom: 30,
  },
  verifyButton: {
    width: '100%',
    backgroundColor: '#3E662F',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  resendButton: {
    marginBottom: 20,
  },
  resendText: {
    color: '#A9ECA2',
    fontSize: 16,
  },
  resendTextDisabled: {
    color: '#666',
  },
  backButton: {
    marginTop: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 14,
  },
});

