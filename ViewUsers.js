import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Fake user data
const FAKE_USERS = [
  {
    id: 1,
    email: 'test@example.com',
    password: '1234',
    firstName: 'John',
    lastName: 'Doe',
    joinDate: '2024-01-15',
    lastLogin: '2024-01-20',
    status: 'Active',
    challengesCompleted: 12,
    streak: 5,
  },
  {
    id: 2,
    email: 'sarah.johnson@email.com',
    password: 'password123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    joinDate: '2024-01-10',
    lastLogin: '2024-01-19',
    status: 'Active',
    challengesCompleted: 8,
    streak: 3,
  },
  {
    id: 3,
    email: 'mike.williams@email.com',
    password: 'securePass',
    firstName: 'Michael',
    lastName: 'Williams',
    joinDate: '2023-12-20',
    lastLogin: '2024-01-18',
    status: 'Active',
    challengesCompleted: 25,
    streak: 10,
  },
  {
    id: 4,
    email: 'emily.brown@email.com',
    password: 'emily2024',
    firstName: 'Emily',
    lastName: 'Brown',
    joinDate: '2024-01-05',
    lastLogin: '2024-01-17',
    status: 'Active',
    challengesCompleted: 5,
    streak: 2,
  },
  {
    id: 5,
    email: 'david.miller@email.com',
    password: 'davidPass',
    firstName: 'David',
    lastName: 'Miller',
    joinDate: '2023-11-30',
    lastLogin: '2024-01-15',
    status: 'Inactive',
    challengesCompleted: 18,
    streak: 0,
  },
  {
    id: 6,
    email: 'jessica.taylor@email.com',
    password: 'jessica123',
    firstName: 'Jessica',
    lastName: 'Taylor',
    joinDate: '2024-01-12',
    lastLogin: '2024-01-20',
    status: 'Active',
    challengesCompleted: 15,
    streak: 7,
  },
  {
    id: 7,
    email: 'chris.anderson@email.com',
    password: 'chrisSecure',
    firstName: 'Christopher',
    lastName: 'Anderson',
    joinDate: '2023-12-05',
    lastLogin: '2024-01-19',
    status: 'Active',
    challengesCompleted: 30,
    streak: 12,
  },
  {
    id: 8,
    email: 'amanda.white@email.com',
    password: 'amanda2024',
    firstName: 'Amanda',
    lastName: 'White',
    joinDate: '2024-01-08',
    lastLogin: '2024-01-16',
    status: 'Active',
    challengesCompleted: 9,
    streak: 4,
  },
  {
    id: 9,
    email: 'ryan.martinez@email.com',
    password: 'ryanPass',
    firstName: 'Ryan',
    lastName: 'Martinez',
    joinDate: '2023-12-15',
    lastLogin: '2024-01-14',
    status: 'Inactive',
    challengesCompleted: 22,
    streak: 0,
  },
  {
    id: 10,
    email: 'lisa.garcia@email.com',
    password: 'lisaSecure',
    firstName: 'Lisa',
    lastName: 'Garcia',
    joinDate: '2024-01-03',
    lastLogin: '2024-01-20',
    status: 'Active',
    challengesCompleted: 6,
    streak: 3,
  },
];

export default function ViewUsersScreen() {
  const navigation = useNavigation();

  const UserCard = ({ user }) => (
    <View style={styles.userCard}>
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
        <View style={[styles.statusBadge, user.status === 'Active' ? styles.activeBadge : styles.inactiveBadge]}>
          <Text style={styles.statusText}>{user.status}</Text>
        </View>
      </View>
      
      <View style={styles.userDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Password:</Text>
          <Text style={styles.detailValue}>{user.password}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Join Date:</Text>
          <Text style={styles.detailValue}>{user.joinDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Last Login:</Text>
          <Text style={styles.detailValue}>{user.lastLogin}</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Challenges</Text>
            <Text style={styles.statValue}>{user.challengesCompleted}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Streak</Text>
            <Text style={styles.statValue}>{user.streak} days</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#15262B', '#1E2B2F', '#0F1A1C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>All Users</Text>
        <Text style={styles.subtitle}>Total Users: {FAKE_USERS.length}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {FAKE_USERS.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    marginBottom: 15,
  },
  backButtonText: {
    color: '#A9ECA2',
    fontSize: 16,
  },
  title: {
    color: '#C8E6C9',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#A9ECA2',
    fontSize: 16,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  userCard: {
    backgroundColor: '#30503B',
    borderColor: '#A9ECA2',
    borderWidth: 2,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#C8E6C9',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    color: '#fff',
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeBadge: {
    backgroundColor: '#3E662F',
    borderColor: '#A9ECA2',
    borderWidth: 1,
  },
  inactiveBadge: {
    backgroundColor: '#5A1A1A',
    borderColor: '#AA0707',
    borderWidth: 1,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  userDetails: {
    borderTopColor: '#A9ECA2',
    borderTopWidth: 1,
    paddingTop: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    color: '#A9ECA2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingTop: 15,
    borderTopColor: '#A9ECA2',
    borderTopWidth: 1,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#A9ECA2',
    fontSize: 12,
    marginBottom: 5,
  },
  statValue: {
    color: '#C8E6C9',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

