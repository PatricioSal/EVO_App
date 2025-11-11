import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function AdminSettings() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          }),
        },
      ]
    );
  };

  const AdminActionButton = ({ title, description, onPress, danger = false }) => (
    <TouchableOpacity
      style={[styles.actionButton, danger && styles.dangerButton]}
      onPress={onPress}
    >
      <Text style={[styles.actionTitle, danger && styles.dangerText]}>{title}</Text>
      <Text style={styles.actionDescription}>{description}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#15262B', '#1E2B2F', '#0F1A1C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Admin Panel</Text>
          <Text style={styles.headerSubtitle}>System Administration</Text>
        </View>

        {/* Admin Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Admin Account</Text>
          <Text style={styles.infoText}>Email: admin@evo.app</Text>
          <Text style={styles.infoText}>Role: System Administrator</Text>
          <Text style={styles.infoText}>Status: Active</Text>
        </View>

        {/* User Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Management</Text>
          <AdminActionButton
            title="View All Users"
            description="View and manage all registered users"
            onPress={() => navigation.navigate('ViewUsers')}
          />
          <AdminActionButton
            title="Delete User"
            description="Remove a user from the system"
            onPress={() => navigation.navigate('DeleteUser')}
            danger
          />
          <AdminActionButton
            title="Reset User Password"
            description="Reset password for any user account"
            onPress={() => Alert.alert('Coming Soon', 'Password reset feature coming soon')}
          />
        </View>

        {/* System Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Settings</Text>
          <AdminActionButton
            title="App Configuration"
            description="Configure app-wide settings"
            onPress={() => Alert.alert('Coming Soon', 'App configuration feature coming soon')}
          />
          <AdminActionButton
            title="Database Management"
            description="Manage user database and backups"
            onPress={() => Alert.alert('Coming Soon', 'Database management feature coming soon')}
          />
          <AdminActionButton
            title="Security Settings"
            description="Configure security and authentication"
            onPress={() => Alert.alert('Coming Soon', 'Security settings feature coming soon')}
          />
        </View>

        {/* Analytics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analytics & Reports</Text>
          <AdminActionButton
            title="User Statistics"
            description="View user activity and engagement metrics"
            onPress={() => navigation.navigate('UserStatistics')}
          />
          <AdminActionButton
            title="System Logs"
            description="View system logs and error reports"
            onPress={() => navigation.navigate('SystemLogs')}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 30,
    marginTop: 20,
  },
  headerTitle: {
    color: '#C8E6C9',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: '#A9ECA2',
    fontSize: 16,
  },
  infoCard: {
    backgroundColor: '#30503B',
    borderColor: '#A9ECA2',
    borderWidth: 2,
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  infoTitle: {
    color: '#A9ECA2',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#C8E6C9',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#3E662F',
    borderColor: '#A9ECA2',
    borderWidth: 2,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  dangerButton: {
    backgroundColor: '#0D47A1',
    borderColor: '#1E88E5',
  },
  actionTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dangerText: {
    color: '#fff',
  },
  actionDescription: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  logoutButton: {
    backgroundColor: '#1E88E5',
    borderColor: '#1565C0',
    borderWidth: 3,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

