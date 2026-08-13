import React, { useEffect, useState } from 'react';
import { Alert, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';

import { Diagnostic, getDiagnostics } from '../../api/service';
import DiagnosticsList from '../../components/diagnostics/DiagnosticsList';

const DiagnosticScreen = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getDiagnostics();
      setDiagnostics(data);
    } catch (error) {
      console.log('Something went wrong while fetching diagnosticos:', error);
      setDiagnostics([]);
    } finally {
      setLoading(false);
    }
  };

  const abrirMenuOpciones = (diagnostico: Diagnostic) => {
    Alert.alert('Opciones', 'Selecciona una acción', [
      {
        text: 'Editar',
        onPress: () => console.log('Editar', diagnostico),
      },
      {
        text: 'Eliminar',
        onPress: () => console.log('Eliminar', diagnostico.idDiagnostico),
        style: 'destructive',
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de Diagnósticos</Text>
      <DiagnosticsList
        diagnostics={diagnostics}
        loading={loading}
        onOpenMenu={abrirMenuOpciones}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 59,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default DiagnosticScreen;
