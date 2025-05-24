import axios from 'axios';
import PsicologoModel from '../../models/psicologo';
import { AvaliacaoModel } from '../../models/avaliacao';
import { HorarioModel } from '../../models/horario';

const API_BASE_URL = 'http://localhost:3000';

export function consultaPsicologo(): Promise<PsicologoModel> {
  return axios
    .get<PsicologoModel>(`${API_BASE_URL}/psicologo/`)
    .then((response) => response.data)
    .catch((err) => {
      console.error('Erro ao carregar psicólogo:', err);
      throw err;
    });
}

export function consultaAvaliacoes(): Promise<AvaliacaoModel[]> {
  return axios
    .get<AvaliacaoModel[]>(`${API_BASE_URL}/avaliacoes`)
    .then((response) => response.data)
    .catch((err) => {
      console.error('Erro ao carregar avaliações:', err);
      return [];
    });
}

export function consultaHorarios(): Promise<HorarioModel[]> {
  return axios
    .get<HorarioModel[]>('http://localhost:3000/Horarios')
    .then((res) => res.data)
    .catch((err) => {
      console.error('Erro ao carregar horários:', err);
      return [];
    });
}
