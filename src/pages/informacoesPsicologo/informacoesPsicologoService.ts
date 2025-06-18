import axios from 'axios';
import PsicologoModel from '../../models/psicologo';
import { AvaliacaoModel } from '../../models/avaliacao';
import { HorarioModel } from '../../models/horario';
import Response from '../../models/response';
import Page from '../../models/page';

const API_BASE_URL = 'http://localhost:8080';

export function consultaPsicologo(id: string): Promise<Response<PsicologoModel>> {
  return axios.get<Response<PsicologoModel>>(`${API_BASE_URL}/psicologos/${id}`)
    .then(response => response.data)
    .catch(err => {
      console.error('Erro ao carregar psicólogo:', err);
      return {
        dado: {} as PsicologoModel,
        erro: err
      }
    });
}

export function consultaAvaliacoes(idPsicologo: string, page: number): Promise<Response<Page<AvaliacaoModel>>> {
  return axios.get<Response<Page<AvaliacaoModel>>>(`${API_BASE_URL}/avaliacoes/psicologo/${idPsicologo}?page=${page}&size=15`)
    .then(response => response.data)
    .catch(err => {
      console.error('Erro ao carregar avaliações:', err);
      return {
        dado: {
          content: [],
          totalElements: 0,
          totalPages: 0,
          number: 0,
          size: 0
        },
        erro: err
      };
    });
}

export function consultaHorarios(psicologoId: number): Promise<HorarioModel[]> {
  return axios
    .get<HorarioModel[]>(`${API_BASE_URL}/horario?psicologoId=${psicologoId}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error('Erro ao carregar horários:', err);
      return [];
    });
}