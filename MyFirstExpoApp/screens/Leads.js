import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const defaultLeads = [
  { name: 'Kari Legros', contact: '+91 98765 43210', status: 'Follow-Up', qualification: 'Masters', interest: 'Mobile Development', source: 'Email Campaign', assignedTo: 'John Doe', updatedAt: 'May 22, 2025 11:02 PM' },
  { name: 'Bridget Hayes', contact: '+91 91234 56789', status: 'Qualified', qualification: 'PhD', interest: 'Digital Marketing', source: 'Website', assignedTo: 'John Doe', updatedAt: 'May 21, 2025 11:34 PM' },
  { name: 'Dr. Lawrence Cummings IV', contact: '+91 99887 76655', status: 'Qualified', qualification: 'High School', interest: 'Mobile Development', source: 'Cold Call', assignedTo: 'Jane Smith', updatedAt: 'May 20, 2025 3:06 PM' },
  { name: 'Amos D’Amore', contact: '+91 78900 11223', status: 'Converted', qualification: 'Bachelors', interest: 'Data Science', source: 'Social Media', assignedTo: 'Jane Smith', updatedAt: 'May 19, 2025 3:03 PM' },
  { name: 'Miss Norma Predovic', contact: '+91 80045 66778', status: 'Converted', qualification: 'High School', interest: 'Data Science', source: 'Website', assignedTo: 'Emily Davis', updatedAt: 'May 19, 2025 1:12 AM' },
  { name: 'Raul Kub', contact: '+91 98765 11100', status: 'Qualified', qualification: 'Other', interest: 'Web Development', source: 'Social Media', assignedTo: 'Jane Smith', updatedAt: 'May 18, 2025 8:54 PM' },
  { name: 'Rickey Swift', contact: '+91 90909 00011', status: 'New', qualification: 'Masters', interest: 'Mobile Development', source: 'Social Media', assignedTo: 'Robert Johnson', updatedAt: 'May 18, 2025 5:19 PM' },
  { name: 'Ernestine Leannon', contact: '+91 98012 34567', status: 'New', qualification: 'High School', interest: 'Web Development', source: 'Website', assignedTo: 'Emily Davis', updatedAt: 'May 17, 2025 7:23 PM' },
  { name: 'Ashley Ebert', contact: '+91 88888 99999', status: 'Follow-Up', qualification: 'PhD', interest: 'UI/UX Design', source: 'Social Media', assignedTo: 'Jane Smith', updatedAt: 'May 17, 2025 3:02 PM' },
  { name: 'Kevin Miles', contact: '+91 91111 22222', status: 'Qualified', qualification: 'Bachelors', interest: 'AI', source: 'Cold Call', assignedTo: 'John Doe', updatedAt: 'May 16, 2025 11:11 AM' },
];

const columns = [
  { key: 'name', label: 'Name', width: 150 },
  { key: 'contact', label: 'Contact', width: 160 },
  { key: 'status', label: 'Status', width: 100 },
  { key: 'qualification', label: 'Qualification', width: 120 },
  { key: 'interest', label: 'Interest', width: 140 },
  { key: 'source', label: 'Source', width: 120 },
  { key: 'assignedTo', label: 'Assigned To', width: 120 },
  { key: 'updatedAt', label: 'Updated At', width: 160 },
];

const STATUS_OPTIONS = ['All', 'New', 'Qualified', 'Converted', 'Follow-Up'];

const Leads = () => {
  const [search, setSearch] = useState('');
  const [leadsList, setLeadsList] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ status: 'All', match: 'AND' });
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const stored = await AsyncStorage.getItem('leads');
        const parsed = stored ? JSON.parse(stored) : [];
        setLeadsList([...parsed, ...defaultLeads]);
      } catch (error) {
        console.error('Failed to load leads:', error);
      }
    };
    if (isFocused) {
      loadLeads();
    }
  }, [isFocused]);

  const filteredLeads = leadsList.filter(lead =>
    lead.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleApplyFilters = async (newFilters) => {
    setFilters(newFilters);
    await AsyncStorage.setItem('leadFilters', JSON.stringify(newFilters));
    setShowFilters(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}></View>
      <View style={styles.titleRow}>
        <Text style={styles.pageTitle}>Leads</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddLeadPage')}
        >
          <Text style={styles.addButtonText}>+ Add Lead</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search leads..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="filter-outline" size={22} color="#1976d2" />
          <Text style={{ color: '#1976d2', marginLeft: 6 }}>Filters</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal>
        <View>
          <View style={styles.tableHeader}>
            {columns.map(col => (
              <Text key={col.key} style={[styles.headerText, { width: col.width }]}>
                {col.label}
              </Text>
            ))}
          </View>

          <FlatList
            data={filteredLeads}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                {columns.map(col => (
                  <Text
                    key={col.key}
                    style={[
                      styles.cell,
                      { width: col.width },
                      col.key === 'status' && styles.statusCell,
                    ]}
                  >
                    {col.key === 'status' ? (
                      <Text style={[styles.badge, getStatusStyle(item.status)]}>
                        {item.status}
                      </Text>
                    ) : (
                      item[col.key]
                    )}
                  </Text>
                ))}
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal visible={showFilters} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <ScrollView
            horizontal
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: Dimensions.get('window').width * 1.3, // Even wider modal
            }}
            showsHorizontalScrollIndicator={true}
          >
            <View style={styles.modalContent}>
              {/* Modal Header: Title + Add New Lead + Hide Filters all in one row */}
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalTitle}>Leads Management</Text>
                <TouchableOpacity
                  style={styles.addButtonModal}
                  onPress={() => {
                    setShowFilters(false);
                    navigation.navigate('AddLeadPage');
                  }}
                >
                  <Ionicons name="add" size={20} color="#fff" />
                  <Text style={{ color: '#fff', marginLeft: 4 }}>Add New Lead</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowFilters(false)} style={styles.hideFiltersBtn}>
                  <Ionicons name="close" size={18} color="#1976d2" />
                  <Text style={{ color: '#1976d2', fontWeight: 'bold', marginLeft: 4 }}>Hide Filters</Text>
                </TouchableOpacity>
              </View>

              {/* Search in Modal */}
              <View style={styles.searchBarModal}>
                <Ionicons name="search-outline" size={18} color="#888" />
                <TextInput
                  style={styles.searchInputModal}
                  placeholder="Search by name, email or phone..."
                  value={search}
                  onChangeText={setSearch}
                />
              </View>

              {/* Advanced Filters */}
              <Text style={styles.advFilters}>Advanced Filters</Text>
              <View style={styles.matchRow}>
                <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Match</Text>
                <Pressable
                  style={styles.radioRow}
                  onPress={() => setFilters({ ...filters, match: 'AND' })}
                >
                  <View style={styles.radioCircle}>
                    {filters.match === 'AND' && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>ALL conditions (AND)</Text>
                </Pressable>
                <Pressable
                  style={styles.radioRow}
                  onPress={() => setFilters({ ...filters, match: 'OR' })}
                >
                  <View style={styles.radioCircle}>
                    {filters.match === 'OR' && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>ANY condition (OR)</Text>
                </Pressable>
              </View>

              {/* Status Dropdown */}
              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Status</Text>
                <View style={styles.dropdown}>
                  {STATUS_OPTIONS.map(opt => (
                    <TouchableOpacity
                      key={opt}
                      style={[
                        styles.dropdownItem,
                        filters.status === opt && styles.dropdownSelected,
                      ]}
                      onPress={() => setFilters({ ...filters, status: opt })}
                    >
                      <Text style={{
                        color: filters.status === opt ? '#1976d2' : '#333'
                      }}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Add Filter Button (non-functional, for UI) */}
              <TouchableOpacity style={styles.addFilterBtn}>
                <Ionicons name="add" size={18} color="#1976d2" />
                <Text style={{ color: '#1976d2', marginLeft: 4 }}>Add Filter</Text>
              </TouchableOpacity>

              {/* Action Buttons */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.clearBtn}
                  onPress={() => handleApplyFilters({ status: 'All', match: 'AND' })}
                >
                  <Text style={{ color: '#1976d2', fontWeight: 'bold' }}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.applyBtn}
                  onPress={() => handleApplyFilters(filters)}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'Follow-Up': return { backgroundColor: '#facc15', color: '#000' };
    case 'Qualified': return { backgroundColor: '#4ade80', color: '#000' };
    case 'Converted': return { backgroundColor: '#c084fc', color: '#000' };
    case 'New': return { backgroundColor: '#93c5fd', color: '#000' };
    default: return { backgroundColor: '#d1d5db', color: '#000' };
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  headerRow: { marginTop: 20, marginBottom: 10 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  headerText: {
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
  },
  cell: { paddingHorizontal: 8 },
  statusCell: { justifyContent: 'center' },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    overflow: 'hidden',
    fontSize: 12,
  },
  // Modal styles
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 18,
 // 100% of screen width
    minWidth: 200,
    maxWidth: 1200,
    minHeight: 240,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginRight: 24,
  },
  addButtonModal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222b45',
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginRight: 16,
  },
  hideFiltersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#f1f5f9',
  },
  searchBarModal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchInputModal: { flex: 1, height: 38, marginLeft: 8, fontSize: 15 },
  advFilters: { fontSize: 20, fontWeight: 'bold', marginVertical: 12 },
  matchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginRight: 18 },
  radioCircle: {
    width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#1976d2',
    alignItems: 'center', justifyContent: 'center', marginRight: 5,
  },
  radioDot: {
    width: 10, height: 10, borderRadius: 5, backgroundColor: '#1976d2',
  },
  radioLabel: { fontSize: 14, color: '#222', marginRight: 8 },
  filterRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  filterLabel: { width: 70, fontWeight: 'bold', fontSize: 15 },
  dropdown: {
    flexDirection: 'row', flexWrap: 'wrap', flex: 1,
    backgroundColor: '#f4f6f8', borderRadius: 6, padding: 4,
  },
  dropdownItem: {
    paddingVertical: 6, paddingHorizontal: 12, borderRadius: 5, margin: 2,
    backgroundColor: '#f4f6f8',
  },
  dropdownSelected: { backgroundColor: '#e3f2fd', borderColor: '#1976d2', borderWidth: 1 },
  addFilterBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#e3f2fd',
    paddingVertical: 7, paddingHorizontal: 14, borderRadius: 6, alignSelf: 'flex-start', marginTop: 8,
  },
  actionRow: {
    flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24,
  },
  clearBtn: {
    backgroundColor: '#e3f2fd', paddingVertical: 10, paddingHorizontal: 22,
    borderRadius: 6, marginRight: 10,
  },
  applyBtn: {
    backgroundColor: '#222b45', paddingVertical: 10, paddingHorizontal: 22,
    borderRadius: 6,
  },
});

export default Leads;