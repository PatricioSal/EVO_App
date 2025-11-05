import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Random system logs
const SYSTEM_LOGS = [
  { id: 1, timestamp: '2024-01-20 14:32:15', type: 'INFO', message: 'User login successful: john.doe@email.com', level: 'info' },
  { id: 2, timestamp: '2024-01-20 14:28:42', type: 'WARNING', message: 'Failed login attempt from IP: 192.168.1.105', level: 'warning' },
  { id: 3, timestamp: '2024-01-20 14:25:18', type: 'INFO', message: 'New user registered: emily.brown@email.com', level: 'info' },
  { id: 4, timestamp: '2024-01-20 14:20:55', type: 'ERROR', message: 'Database connection timeout - retrying...', level: 'error' },
  { id: 5, timestamp: '2024-01-20 14:15:33', type: 'INFO', message: 'Challenge completed: User ID 234, Challenge ID 45', level: 'info' },
  { id: 6, timestamp: '2024-01-20 14:10:12', type: 'WARNING', message: 'High memory usage detected: 85%', level: 'warning' },
  { id: 7, timestamp: '2024-01-20 14:05:47', type: 'INFO', message: 'Email sent successfully: 2FA code to user@example.com', level: 'info' },
  { id: 8, timestamp: '2024-01-20 14:00:29', type: 'ERROR', message: 'Failed to send notification: Network error', level: 'error' },
  { id: 9, timestamp: '2024-01-20 13:55:14', type: 'INFO', message: 'User logout: admin@evo.app', level: 'info' },
  { id: 10, timestamp: '2024-01-20 13:50:08', type: 'WARNING', message: 'API rate limit approaching: 450/500 requests', level: 'warning' },
  { id: 11, timestamp: '2024-01-20 13:45:22', type: 'INFO', message: 'Password reset requested: sarah.johnson@email.com', level: 'info' },
  { id: 12, timestamp: '2024-01-20 13:40:05', type: 'ERROR', message: 'File upload failed: Invalid file format', level: 'error' },
  { id: 13, timestamp: '2024-01-20 13:35:51', type: 'INFO', message: 'User profile updated: User ID 156', level: 'info' },
  { id: 14, timestamp: '2024-01-20 13:30:33', type: 'WARNING', message: 'Cache miss rate above threshold: 12%', level: 'warning' },
  { id: 15, timestamp: '2024-01-20 13:25:17', type: 'INFO', message: 'Backup completed successfully: users_db_backup_20240120.sql', level: 'info' },
  { id: 16, timestamp: '2024-01-20 13:20:44', type: 'ERROR', message: 'Authentication token expired: User session terminated', level: 'error' },
  { id: 17, timestamp: '2024-01-20 13:15:28', type: 'INFO', message: 'Challenge generated: Difficulty=Hard, Category=Adventure', level: 'info' },
  { id: 18, timestamp: '2024-01-20 13:10:12', type: 'WARNING', message: 'Slow query detected: 2.3s execution time', level: 'warning' },
  { id: 19, timestamp: '2024-01-20 13:05:55', type: 'INFO', message: 'User streak updated: User ID 89, New streak: 7 days', level: 'info' },
  { id: 20, timestamp: '2024-01-20 13:00:38', type: 'ERROR', message: 'Payment processing failed: Insufficient funds', level: 'error' },
  { id: 21, timestamp: '2024-01-20 12:55:21', type: 'INFO', message: 'System health check: All services operational', level: 'info' },
  { id: 22, timestamp: '2024-01-20 12:50:04', type: 'WARNING', message: 'Disk space low: 15% remaining', level: 'warning' },
  { id: 23, timestamp: '2024-01-20 12:45:47', type: 'INFO', message: 'User deleted: inactive_user@email.com', level: 'info' },
  { id: 24, timestamp: '2024-01-20 12:40:30', type: 'ERROR', message: 'External API unavailable: 503 Service Unavailable', level: 'error' },
];

export default function SystemLogsScreen() {
  const navigation = useNavigation();
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = SYSTEM_LOGS.filter(log => {
    const matchesFilter = filter === 'ALL' || log.type === filter;
    const matchesSearch = searchQuery === '' || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.timestamp.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const getLogIcon = (level) => {
    switch(level) {
      case 'error':
        return <Ionicons name="close-circle" size={20} color="#AA0707" />;
      case 'warning':
        return <Ionicons name="warning" size={20} color="#FFA500" />;
      default:
        return <Ionicons name="information-circle" size={20} color="#1E88E5" />;
    }
  };

  const getLogColor = (level) => {
    switch(level) {
      case 'error':
        return '#AA0707';
      case 'warning':
        return '#FFA500';
      default:
        return '#1E88E5';
    }
  };

  const LogItem = ({ log }) => (
    <View style={[styles.logItem, { borderLeftColor: getLogColor(log.level) }]}>
      <View style={styles.logHeader}>
        {getLogIcon(log.level)}
        <Text style={[styles.logType, { color: getLogColor(log.level) }]}>{log.type}</Text>
        <Text style={styles.logTimestamp}>{log.timestamp}</Text>
      </View>
      <Text style={styles.logMessage}>{log.message}</Text>
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
        <Text style={styles.title}>System Logs</Text>
        <Text style={styles.subtitle}>Total Logs: {SYSTEM_LOGS.length}</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.filterContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#A9ECA2" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search logs..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.filterButtons}>
          {['ALL', 'INFO', 'WARNING', 'ERROR'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.filterButton, filter === type && styles.filterButtonActive]}
              onPress={() => setFilter(type)}
            >
              <Text style={[styles.filterButtonText, filter === type && styles.filterButtonTextActive]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredLogs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No logs found</Text>
          </View>
        ) : (
          filteredLogs.map((log) => (
            <LogItem key={log.id} log={log} />
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
  filterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#30503B',
    borderColor: '#A9ECA2',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
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
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    backgroundColor: '#30503B',
    borderColor: '#A9ECA2',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#1E88E5',
    borderColor: '#1565C0',
  },
  filterButtonText: {
    color: '#A9ECA2',
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  logItem: {
    backgroundColor: '#30503B',
    borderColor: '#A9ECA2',
    borderWidth: 2,
    borderLeftWidth: 5,
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logType: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
    marginRight: 10,
  },
  logTimestamp: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 'auto',
  },
  logMessage: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    color: '#A9ECA2',
    fontSize: 16,
  },
});

