import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { getPatients, Patient } from '../../api/service';
import { Pagination } from './Pagination';
import { PatientRow } from './PatientRow';
import { TableControls } from './TableControls';
import { TableHeader } from './TableHeader';

const Separator = () => <View style={styles.separator} />;

export const PatientsTable = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados generales
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.log('Something went wrong while fetching patients:', error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  // Lógica de filtrado y paginación
  const filteredPatients = patients.filter(patient =>
    patient.nombrePaciente.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedData = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
  };

  const handleLimitChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1); 
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
  }

  if (patients.length === 0) {
    return <Text style={styles.emptyText}>No hay pacientes disponibles.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        
        {/* 1. Controles Superiores (Buscador y Límite) */}
        <TableControls
          itemsPerPage={itemsPerPage}
          searchQuery={searchQuery}
          onLimitChange={handleLimitChange}
          onSearch={handleSearch}
        />

        <View style={styles.tableContainer}>
          {/* 2. Cabecera de la tabla */}
          <TableHeader />

          {/* 3. Lista de pacientes */}
          <FlatList
            data={paginatedData}
            keyExtractor={item => item.idPaciente.toString()}
            renderItem={({ item }) => (
              <PatientRow
                patient={item}
                onView={p => console.log('Ver', p.idPaciente)}
                onEdit={p => console.log('Editar', p.idPaciente)}
                onDelete={p => console.log('Eliminar', p.idPaciente)}
              />
            )}
            ItemSeparatorComponent={Separator}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No se encontraron pacientes.</Text>
            }
          />
        </View>

        {/* 4. Paginación */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    marginTop: 50,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  tableContainer: {
    flex: 1,
    zIndex: -1,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
  },
});
