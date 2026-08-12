import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Patient } from '../../api/patientService';

interface PatientRowProps {
  patient: Patient;
  isOpen: boolean; 
  onToggle: () => void; 
  onView?: (patient: Patient) => void;
  onEdit?: (patient: Patient) => void;
  onDelete?: (patient: Patient) => void;
}

export const PatientRow = ({ patient, isOpen, onToggle, onView, onEdit, onDelete }: PatientRowProps) => {

  const handleAction = (action: 'view' | 'edit' | 'delete') => {
    onToggle(); // Le decimos al Jefe que cierre el menú al seleccionar una opción
    if (action === 'view' && onView) onView(patient);
    if (action === 'edit' && onEdit) onEdit(patient);
    if (action === 'delete' && onDelete) onDelete(patient);
  };

  return (
    // Si este menú es el que está abierto, elevamos su zIndex
    <View style={[styles.row, isOpen && { zIndex: 999, elevation: 999 }]}>
      
      <Text style={[styles.cell, styles.colFolio]}>{patient.idPaciente}</Text>

      <View style={[styles.cell, styles.colNombre, styles.nameContainer]}>
        <Image source={{ uri: patient.fotoPerfil }} style={styles.avatar} />
        <Text style={styles.cellText} numberOfLines={1}>
          {patient.nombrePaciente}
        </Text>
      </View>

      <View style={[styles.cell, styles.colAcciones, styles.actionsContainer]}>
        
        {/* Botón de los 3 puntos: Llama a onToggle en vez de toggleMenu */}
        <TouchableOpacity 
          style={[styles.actionBtn, styles.btnView]} 
          onPress={onToggle}
        >
          <Text style={styles.btnText}>...</Text>
        </TouchableOpacity>

        {/* MENÚ FLOTANTE: Ahora depende de "isOpen" */}
        {isOpen && (
          <View style={styles.floatingMenu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleAction('view')}>
              <Text style={styles.menuItemText}>Ver Perfil</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={() => handleAction('edit')}>
              <Text style={styles.menuItemText}>Editar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.menuItem, styles.menuItemDelete]} onPress={() => handleAction('delete')}>
              <Text style={styles.menuItemTextDelete}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFF', // Opcional: Ayuda a que el zIndex se comporte mejor
  },
  cell: {
    justifyContent: 'flex-start',
  },
  cellText: {
    fontSize: 14,
    color: '#2e2e2e',
    flexShrink: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#E0E0E0',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Alineado a la derecha para que el menú no se salga de la pantalla
    position: 'relative', // Necesario para que el menú flotante se posicione respecto a este contenedor
  },
  actionBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    // justcontent: 'flex-center',
  },
  btnView: {
    backgroundColor: '#E8F5E9',
    width: 30,
    height: 30,
  },
  btnText: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  colFolio: {
    width: 45,
  },
  colNombre: {
    flex: 1,
    paddingRight: 8,
  },
  colAcciones: {
    width: 50, // Ajustado para darle espacio al botón
    alignItems: 'flex-end',
  },

  // --- ESTILOS DEL MENÚ FLOTANTE ---
  floatingMenu: {
    position: 'absolute',
    top: 32, // Aparece justo debajo del botón
    right: 0, // Alineado a la derecha
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 4,
    minWidth: 100,
    // Sombras
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 14,
    color: '#333333',
  },
  menuItemDelete: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  menuItemTextDelete: {
    fontSize: 14,
    color: '#D32F2F', // Texto rojo para acción destructiva
  },
});