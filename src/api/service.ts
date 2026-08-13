import { apiClient } from './axiosConfig';

export interface Patient {
  idPaciente: number;
  nombrePaciente: string;
  genero: string;
  fecNacimiento: string;
  domicilio: string;
  fotoPerfil: string;
}

export interface Diagnostic {
  idDiagnostico: number;
  nombreDiagnostico: string;
  descripcion: string;
  idDiagnosticoCategoria: number;
  categoria: string;
  imagen: string;
  idDiagnosticoTipo: number;
  tipo: string;
  esCronico: number;
  esCronicoCadena: string;
}

export const getPatients = async (): Promise<Patient[]> => {
  try {
    const response = await apiClient.get<Patient[]>('/patients');
    return response.data;
  } catch (error) {
    console.error('Something went wrong while fetching patients:', error);
    throw error;
  }
};

export const getDiagnostics = async (): Promise<Diagnostic[]> => {
  try {
    const response = await apiClient.get<Diagnostic[]>('/diagnostics');
    return response.data;
  } catch (error) {
    console.error('Something went wrong while fetching diagnosticos:', error);
    throw error;
  }
}