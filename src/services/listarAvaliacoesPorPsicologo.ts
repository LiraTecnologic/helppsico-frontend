import axios from 'axios';

export async function listarAvaliacoesPorPsicologo(idPsicologo: string) {
  try {
    const response = await axios.get(`http://localhost:3000/avaliacoes?psicologoId=${idPsicologo}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    return [];
  }
}