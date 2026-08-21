import React from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { PatientsTable } from '../../components/patientTable/PatientsTable';

const PatientsList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Lista de Usuarios </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <PatientsTable />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 59,
    height: '100%',
  },
  keyboardView: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default PatientsList;
