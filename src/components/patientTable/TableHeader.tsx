import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TableHeader = () => (
  <View style={styles.headerRow}>
    <Text style={[styles.headerText, styles.colFolio]}>Folio</Text>
    <Text style={[styles.headerText, styles.colNombre]}>Nombre</Text>
    <Text style={[styles.headerText, styles.colAcciones]}>Acciones</Text>
  </View>
);

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 8,
  },
  headerText: { fontWeight: 'bold', fontSize: 14, color: '#333333' },
  colFolio: { width: 45 },
  colNombre: { flex: 1, paddingRight: 8 },
  colAcciones: { width: 'auto' },
});
