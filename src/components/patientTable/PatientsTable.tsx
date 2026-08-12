import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getPatients, Patient } from '../../api/patientService';

const Separator = () => <View style={styles.separator} />;

export const PatientsTable = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para búsqueda, paginación y selector
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showPicker, setShowPicker] = useState(false); // Controla el dropdown personalizado

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.log(
        'Something went wrong while fetching patients, using fallback data:',
        error,
      );
      // Mock de respaldo para probar la UI
      setPatients(
        Array.from({ length: 15 }).map((_, i) => ({
          idPaciente: i + 1,
          nombrePaciente: `Paciente de prueba ${i + 1}`,
          genero: i % 2 === 0 ? 'Masculino' : 'Femenino',
          fecNacimiento: '2000-01-01',
          domicilio: 'Domicilio Conocido',
          fotoPerfil: `https://ui-avatars.com/api/?name=Paciente+${i + 1}`,
        })),
      );
    } finally {
      setLoading(false);
    }
  };

  // Lógica de filtrado por búsqueda
  const filteredPatients = patients.filter(patient =>
    patient.nombrePaciente.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Lógica de paginación
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedData = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Manejo de búsqueda para resetear la página
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
  };

  // Manejo del cambio de items por página
  const handleLimitChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1); // Volvemos a la página 1 al cambiar el límite
    setShowPicker(false); // Cerramos el dropdown
  };

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.headerText, styles.colFolio]}>Folio</Text>
      <Text style={[styles.headerText, styles.colNombre]}>Nombre</Text>
      <Text style={[styles.headerText, styles.colAcciones]}>Acciones</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Patient }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.colFolio]}>{item.idPaciente}</Text>

      <View style={[styles.cell, styles.colNombre, styles.nameContainer]}>
        <Image source={{ uri: item.fotoPerfil }} style={styles.avatar} />
        <Text style={styles.cellText} numberOfLines={1}>
          {item.nombrePaciente}
        </Text>
      </View>

      <View style={[styles.cell, styles.colAcciones, styles.actionsContainer]}>
        <TouchableOpacity style={[styles.actionBtn, styles.btnView]}>
          <Text style={styles.btnText}>...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Controles Superiores */}
        <View style={styles.topControls}>
          {/* Dropdown Personalizado (Izquierda) */}
          <View style={styles.selectorWrapper}>
            <Text style={styles.selectorLabel}>Mostrar:</Text>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.selectorButton}
                onPress={() => setShowPicker(!showPicker)}
              >
                <Text style={styles.selectorText}>{itemsPerPage}</Text>
                <Text style={styles.selectorIcon}>
                  {showPicker ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>

              {showPicker && (
                <View style={styles.dropdownOptions}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleLimitChange(5)}
                  >
                    <Text style={styles.dropdownItemText}>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleLimitChange(10)}
                  >
                    <Text style={styles.dropdownItemText}>10</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {/* Buscador (Derecha - Desde el centro al borde) */}
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Contenedor con zIndex negativo para no estorbar al dropdown */}
        <View style={styles.tableContainer}>
          {/* Cabecera de la tabla */}
          {renderHeader()}

          {/* Lista de pacientes */}
          <FlatList
            data={paginatedData}
            keyExtractor={item => item.idPaciente.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={Separator}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No se encontraron pacientes.</Text>
            }
          />
        </View>

        {/* Controles de Paginación */}
        {totalPages > 0 && (
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              style={[
                styles.pageButton,
                currentPage === 1 && styles.pageButtonDisabled,
              ]}
              onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <Text
                style={[
                  styles.pageButtonText,
                  currentPage === 1 && styles.pageButtonTextDisabled,
                ]}
              >
                Anterior
              </Text>
            </TouchableOpacity>

            <Text style={styles.pageIndicator}>
              Pág {currentPage} de {totalPages}
            </Text>

            <TouchableOpacity
              style={[
                styles.pageButton,
                currentPage === totalPages && styles.pageButtonDisabled,
              ]}
              onPress={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <Text
                style={[
                  styles.pageButtonText,
                  currentPage === totalPages && styles.pageButtonTextDisabled,
                ]}
              >
                Siguiente
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // --- Controles Superiores ---
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    zIndex: 10, // Para que el dropdown pase por encima del resto
    elevation: 10,
  },

  // Selector Custom
  selectorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%', // Limita el ancho del lado izquierdo
  },
  selectorLabel: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
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
  selectorText: {
    fontSize: 14,
    color: '#333',
  },
  selectorIcon: {
    fontSize: 10,
    color: '#666',
  },
  dropdownOptions: {
    position: 'absolute',
    top: 45, // Justo debajo del botón
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
    zIndex: 999, // Asegura que se vea por encima
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },

  // Buscador
  searchInput: {
    width: '50%', // Comienza exactamente desde el centro y toma la mitad derecha
    backgroundColor: '#F5F6FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  // Contenedor de la Tabla para proteger el zIndex del Dropdown
  tableContainer: {
    flex: 1,
    zIndex: -1,
  },

  // --- Fin Controles Superiores ---

  headerRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 8,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333333',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  cell: {
    justifyContent: 'flex-start',
  },
  cellText: {
    fontSize: 13,
    color: '#555555',
    flexShrink: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#E0E0E0',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 4,
  },
  actionBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView: { backgroundColor: '#E8F5E9' },
  btnText: { fontSize: 12 },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    marginBottom: 20,
  },

  // Paginación
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  pageButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  pageButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  pageButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  pageButtonTextDisabled: {
    color: '#999',
  },
  pageIndicator: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },

  // Ajustes de columnas para móviles (Flexbox)
  colFolio: { width: 45 },
  colNombre: { flex: 1, paddingRight: 8 },
  colAcciones: { width: 'auto' },
});
