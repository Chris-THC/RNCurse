import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Patient } from '../../api/service';
interface PatientRowProps {
  patient: Patient;
  onView?: (patient: Patient) => void;
  onEdit?: (patient: Patient) => void;
  onDelete?: (patient: Patient) => void;
}

export const PatientRow = ({ patient, onView, onEdit, onDelete}: PatientRowProps) => {
  return (
    <View style={styles.row}>
      {/* Folio */}
      <Text style={[styles.cell, styles.colFolio]}>{patient.idPaciente}</Text>

      {/* Nombre */}
      <View style={[styles.cell, styles.colNombre, styles.nameContainer]}>
        <Image source={{ uri: patient.fotoPerfil }} style={styles.avatar} />
        <Text style={styles.cellText} numberOfLines={1}>
          {patient.nombrePaciente}
        </Text>
      </View>

      {/* Acciones */}
      <View style={[styles.cell, styles.colAcciones, styles.actionsContainer]}>
        {/* Ver */}
        <TouchableOpacity style={[styles.actionBtn, styles.btnView]} onPress={() => onView?.(patient)} activeOpacity={0.7}>
          <Image source={require('../../../assets/icons/eye.png')} style={styles.actionIcon}/>
        </TouchableOpacity>

        {/* Editar */}
        <TouchableOpacity style={[styles.actionBtn, styles.btnEdit]} onPress={() => onEdit?.(patient)} activeOpacity={0.7}>
          <Image source={require('../../../assets/icons/pencil.png')} style={styles.actionIcon}/>
        </TouchableOpacity>

        {/* Eliminar */}
        <TouchableOpacity style={[styles.actionBtn, styles.btnDelete]} onPress={() => onDelete?.(patient)} activeOpacity={0.7}>
          <Image source={require('../../../assets/icons/trash.png')} style={styles.actionIcon}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 58,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cell: {
    justifyContent: 'flex-start',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    backgroundColor: '#E0E0E0',
  },
  cellText: {
    flex: 1,
    fontSize: 14,
    color: '#2E2E2E',
  },
  // Acciones
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 3,
  },
  actionBtn: {
    width: 30,
    height: 30,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  btnView: {
    backgroundColor: '#04ad13',
  },
  btnEdit: {
    backgroundColor: '#229df4',
  },
  btnDelete: {
    backgroundColor: '#ff1c3e',
  },
  //  Columnas
  colFolio: {
    width: 30,
    fontSize: 13,
    color: '#555',
  },
  colNombre: {
    flex: 1,
    minWidth: 0,
    paddingRight: 8,
  },
  colAcciones: {
    width: 100,
  },
});