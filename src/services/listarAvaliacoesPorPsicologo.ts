import axios from 'axios';

export async function listarAvaliacoesPorPsicologo(idPsicologo: string) {
  try {
    const response = await axios.get(`http://localhost:3000/avaliacoes/psicologo/${idPsicologo}`);
    return response.data;
  } catch (error) {
    return [];
  }
}