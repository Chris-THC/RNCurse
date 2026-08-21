import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface TableControlsProps {
  itemsPerPage: number;
  searchQuery: string;
  onLimitChange: (limit: number) => void;
  onSearch: (text: string) => void;
}

export const TableControls = ({ itemsPerPage, searchQuery, onLimitChange, onSearch }: TableControlsProps) => {
  const [showPicker, setShowPicker] = useState(false); // ¡El estado del menú vive aquí!

  const handleSelect = (limit: number) => {
    onLimitChange(limit);
    setShowPicker(false);
  };

  return (
    <View style={styles.topControls}>
      {/* Selector de cantidad */}
      <View style={styles.selectorWrapper}>
        <Text style={styles.selectorLabel}>Mostrar:</Text>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity style={styles.selectorButton} onPress={() => setShowPicker(!showPicker)}>
            <Text style={styles.selectorText}>{itemsPerPage}</Text>
            <Text style={styles.selectorIcon}>{showPicker ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {showPicker && (
            <View style={styles.dropdownOptions}>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(5)}>
                <Text style={styles.dropdownItemText}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(10)}>
                <Text style={styles.dropdownItemText}>10</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Buscador */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    zIndex: 10,
    elevation: 10,
  },
  selectorWrapper: { flexDirection: 'row', alignItems: 'center', width: '45%' },
  selectorLabel: { fontSize: 14, color: '#333', marginRight: 8 },
  dropdownContainer: {
    flex: 1,
    position: 'relative',
    zIndex: 20,
    elevation: 20,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F6FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectorText: { fontSize: 14, color: '#333' },
  selectorIcon: { fontSize: 10, color: '#666' },
  dropdownOptions: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    elevation: 5,
    zIndex: 999,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: { fontSize: 14, color: '#333' },
  searchInput: {
    width: '50%',
    backgroundColor: '#F5F6FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});