import React from 'react';
import { FlatList, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import Card from './Card';
import { Diagnostic } from '../../api/service';

interface DiagnosticsListProps {
  diagnostics: Diagnostic[];
  loading: boolean;
  onOpenMenu: (diagnostico: Diagnostic) => void;
}

const DiagnosticsList: React.FC<DiagnosticsListProps> = ({ diagnostics, loading, onOpenMenu }) => {
  
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#65C227" />
      </View>
    );
  }

  return (
    <FlatList
      data={diagnostics}
      keyExtractor={(item) => item.idDiagnostico.toString()}
      renderItem={({ item }) => <Card item={item} onOpenMenu={onOpenMenu} />}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No hay diagnósticos disponibles.</Text>
      }
    />
  );
};

export default DiagnosticsList;

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#4A4A4A',
    marginTop: 20,
  },
});