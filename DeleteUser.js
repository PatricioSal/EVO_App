import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Same fake user data as ViewUsers
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

export default function DeleteUserScreen() {
  const navigation = useNavigation();
  const [users, setUsers] = useState(FAKE_USERS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  const handleDeleteUser = (user) => {
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${user.firstName} ${user.lastName} (${user.email})?\n\nThis action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setUsers(users.filter(u => u.id !== user.id));
            Alert.alert('Success', `User ${user.email} has been deleted.`);
          },
        },
      ]
    );
  };

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
          <Text style={styles.detailLabel}>Join Date:</Text>
          <Text style={styles.detailValue}>{user.joinDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Last Login:</Text>
          <Text style={styles.detailValue}>{user.lastLogin}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Challenges:</Text>
          <Text style={styles.detailValue}>{user.challengesCompleted}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteUser(user)}
      >
        <Ionicons name="trash-outline" size={20} color="#fff" />
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
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
        <Text style={styles.title}>Delete Users</Text>
        <Text style={styles.subtitle}>Remaining Users: {users.length}</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#A9ECA2" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or email..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredUsers.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={60} color="#666" />
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        ) : (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#30503B',
    borderColor: '#A9ECA2',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  userCard: {
    backgroundColor: '#30503B',
    borderColor: '#AA0707',
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
    marginBottom: 15,
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
  deleteButton: {
    backgroundColor: '#AA0707',
    borderColor: '#640202',
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    color: '#A9ECA2',
    fontSize: 16,
    marginTop: 15,
  },
});

