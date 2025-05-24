import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const items = [
  { label: 'Dashboard', icon: 'grid-outline', route: 'Dashboard' },
  { label: 'Leads', icon: 'people-outline', route: 'Leads' },
  { label: 'Follow-Ups', icon: 'calendar-outline', route: 'FollowUps' },
  { label: 'Products', icon: 'cube-outline', route: 'Products' },
  { label: 'Notifications', icon: 'notifications-outline', route: 'Notifications' },
  { label: 'Settings', icon: 'settings-outline', route: 'Settings' },
];

export default function Sidebar({ navigation }) {
  return (
    <View style={styles.sidebar}>
      <Text style={styles.logo}>LeadCRM</Text>
      {items.map(item => (
        <TouchableOpacity
          key={item.route}
          style={styles.item}
          onPress={() => navigation.navigate(item.route)}
        >
          <Ionicons name={item.icon} size={22} color="#34495e" />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: { flex: 1, backgroundColor: '#f7f8fa', paddingTop: 48, paddingHorizontal: 16 },
  logo: { fontSize: 22, fontWeight: 'bold', marginBottom: 32, color: '#1976d2' },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  label: { marginLeft: 18, fontSize: 16, color: '#34495e' },
});