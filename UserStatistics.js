import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Random user analytics data
const ANALYTICS_DATA = {
  totalUsers: 1247,
  activeUsers: 892,
  inactiveUsers: 355,
  newUsersThisMonth: 156,
  totalChallengesCompleted: 18452,
  averageChallengesPerUser: 14.8,
  averageStreak: 6.3,
  longestStreak: 45,
  topCategory: 'Physical',
  dailyActiveUsers: {
    'Monday': 234,
    'Tuesday': 267,
    'Wednesday': 289,
    'Thursday': 245,
    'Friday': 298,
    'Saturday': 312,
    'Sunday': 278,
  },
  categoryBreakdown: {
    'Physical': 5234,
    'Education': 4123,
    'Adventure': 3891,
    'Community': 5204,
  },
  userGrowth: {
    'Jan 2024': 892,
    'Feb 2024': 1045,
    'Mar 2024': 1189,
    'Apr 2024': 1247,
  },
  retentionRate: 72.3,
  churnRate: 8.5,
  averageSessionDuration: '12 minutes',
  peakHours: ['6:00 PM - 8:00 PM', '9:00 AM - 11:00 AM'],
  deviceBreakdown: {
    'iOS': 654,
    'Android': 593,
  },
};

export default function UserStatisticsScreen() {
  const navigation = useNavigation();

  const StatCard = ({ title, value, subtitle, color = '#3E662F' }) => (
    <View style={[styles.statCard, { borderColor: color }]}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={[styles.statValue, { color: color }]}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
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
        <Text style={styles.title}>User Analytics</Text>
        <Text style={styles.subtitle}>Real-time Statistics & Metrics</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Overview Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statGrid}>
            <StatCard title="Total Users" value={ANALYTICS_DATA.totalUsers.toLocaleString()} />
            <StatCard title="Active Users" value={ANALYTICS_DATA.activeUsers.toLocaleString()} color="#3E662F" />
            <StatCard title="Inactive Users" value={ANALYTICS_DATA.inactiveUsers.toLocaleString()} color="#AA0707" />
            <StatCard title="New This Month" value={ANALYTICS_DATA.newUsersThisMonth.toLocaleString()} color="#1E88E5" />
          </View>
        </View>

        {/* Engagement Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Engagement</Text>
          <View style={styles.statGrid}>
            <StatCard 
              title="Total Challenges" 
              value={ANALYTICS_DATA.totalChallengesCompleted.toLocaleString()} 
            />
            <StatCard 
              title="Avg per User" 
              value={ANALYTICS_DATA.averageChallengesPerUser} 
              subtitle="challenges"
            />
            <StatCard 
              title="Avg Streak" 
              value={ANALYTICS_DATA.averageStreak} 
              subtitle="days"
            />
            <StatCard 
              title="Longest Streak" 
              value={ANALYTICS_DATA.longestStreak} 
              subtitle="days"
              color="#1E88E5"
            />
          </View>
        </View>

        {/* Category Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Breakdown</Text>
          <View style={styles.categoryCard}>
            {Object.entries(ANALYTICS_DATA.categoryBreakdown).map(([category, count]) => (
              <View key={category} style={styles.categoryRow}>
                <Text style={styles.categoryName}>{category}</Text>
                <Text style={styles.categoryCount}>{count.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Daily Active Users */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Active Users (DAU)</Text>
          <View style={styles.categoryCard}>
            {Object.entries(ANALYTICS_DATA.dailyActiveUsers).map(([day, count]) => (
              <View key={day} style={styles.categoryRow}>
                <Text style={styles.categoryName}>{day}</Text>
                <Text style={styles.categoryCount}>{count}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* User Growth */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Growth Trend</Text>
          <View style={styles.categoryCard}>
            {Object.entries(ANALYTICS_DATA.userGrowth).map(([month, count]) => (
              <View key={month} style={styles.categoryRow}>
                <Text style={styles.categoryName}>{month}</Text>
                <Text style={styles.categoryCount}>{count.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Additional Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Metrics</Text>
          <View style={styles.statGrid}>
            <StatCard 
              title="Retention Rate" 
              value={`${ANALYTICS_DATA.retentionRate}%`} 
              color="#3E662F"
            />
            <StatCard 
              title="Churn Rate" 
              value={`${ANALYTICS_DATA.churnRate}%`} 
              color="#AA0707"
            />
            <StatCard 
              title="Avg Session" 
              value={ANALYTICS_DATA.averageSessionDuration} 
            />
            <StatCard 
              title="Top Category" 
              value={ANALYTICS_DATA.topCategory} 
              color="#1E88E5"
            />
          </View>
        </View>

        {/* Peak Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Peak Activity Hours</Text>
          <View style={styles.categoryCard}>
            {ANALYTICS_DATA.peakHours.map((hour, index) => (
              <View key={index} style={styles.categoryRow}>
                <Text style={styles.categoryName}>Peak {index + 1}</Text>
                <Text style={styles.categoryCount}>{hour}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Device Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device Distribution</Text>
          <View style={styles.categoryCard}>
            {Object.entries(ANALYTICS_DATA.deviceBreakdown).map(([device, count]) => (
              <View key={device} style={styles.categoryRow}>
                <Text style={styles.categoryName}>{device}</Text>
                <Text style={styles.categoryCount}>{count}</Text>
              </View>
            ))}
          </View>
        </View>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#C8E6C9',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#30503B',
    borderColor: '#A9ECA2',
    borderWidth: 2,
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 12,
  },
  statTitle: {
    color: '#A9ECA2',
    fontSize: 12,
    marginBottom: 8,
  },
  statValue: {
    color: '#A9ECA2',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statSubtitle: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  categoryCard: {
    backgroundColor: '#30503B',
    borderColor: '#A9ECA2',
    borderWidth: 2,
    borderRadius: 12,
    padding: 15,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#A9ECA2',
    borderBottomWidth: 1,
  },
  categoryName: {
    color: '#A9ECA2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryCount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

