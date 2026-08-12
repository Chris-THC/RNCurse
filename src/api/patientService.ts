import { apiClient } from './axiosConfig';

export interface Patient {
  idPaciente: number;
  nombrePaciente: string;
  genero: string;
  fecNacimiento: string;
  domicilio: string;
  fotoPerfil: string;
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