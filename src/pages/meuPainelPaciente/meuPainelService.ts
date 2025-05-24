import axios from 'axios';
import VinculoModel from '../../models/vinculo';
import ConsultaModel from '../../models/consulta';
import ProntuarioModel from '../../models/prontuario';

const API_BASE = 'http://localhost:3000';

export function getVinculo(): Promise<VinculoModel> {
  return axios.get<VinculoModel>(`${API_BASE}/vinculo`)
    .then(res => res.data)
    .catch(err => {
      console.error('Erro ao buscar vínculo:', err);
      return {} as VinculoModel;
    });
}

export function getSessoes(): Promise<ConsultaModel[]> {
  return axios.get<ConsultaModel[]>(`${API_BASE}/sessoes`)
    .then(res => res.data)
    .catch(err => {
      console.error('Erro ao buscar sessões:', err);
      return [];
    });
}

export function getProntuarios(): Promise<ProntuarioModel[]> {
  return axios.get<ProntuarioModel[]>(`${API_BASE}/dcoumentos`)
    .then(res => res.data)
    .catch(err => {
      console.error('Erro ao buscar prontuários:', err);
      return [];
    });
}
