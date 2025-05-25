import { useEffect, useState } from 'react';
import './verPsicologos.css';
import Header from '../../components/layout/header/header';
import CardPsicologo from '../../components/layout/Cards/cardPsicologo/cardPsicologo';
import Pesquisa from '../../components/layout/pesquisa/pesquisa';
import Carrossel from '../../components/layout/carrossel/carrossel';
import { listarPsicologos } from '../../services/listarPsicologos.service';
import { listarAvaliacoesPorPsicologo } from '../../services/listarAvaliacoesPorPsicologo';
import PsicologoModel from '../../models/psicologo';
import calcular from '../../utils/calculoData';
import calcularMedia from '../../utils/mediaAvaliacao';
import qtdeAvaliacao from '../../utils/qtdeAvaliacao';

type ProfissionalCard = {
  urlFoto: string;
  nome: string;
  idade: number;
  crp: string;
  mediaAvaliacoes: number;
  quantidadeAvaliacoes: number;
  biografia: string;
};

export default function VerPsicologos() {
  const [pesquisaTermo, setPesquisaTermo] = useState('');
  const [profissionais, setProfissionais] = useState<ProfissionalCard[]>([]);

  useEffect(() => {
    const carregarDados = async () => {
      const psicologos = await listarPsicologos();

      const profissionaisComDados = await Promise.all(
        psicologos.map(async (psicologo: PsicologoModel) => {
          const avaliacoes = await listarAvaliacoesPorPsicologo(psicologo.id);

          return {
            urlFoto: psicologo.fotoUrl,
            nome: psicologo.nome,
            idade: calcular(psicologo.dataNascimento),
            crp: psicologo.crp,
            mediaAvaliacoes: calcularMedia(avaliacoes),
            quantidadeAvaliacoes: qtdeAvaliacao(avaliacoes),
            biografia: psicologo.biografia
          };
        })
      );

      setProfissionais(profissionaisComDados);
    };

    carregarDados();
  }, []);

  const profissionaisFiltrados = profissionais.filter((psicologo) =>
    psicologo.nome.toLowerCase().includes(pesquisaTermo.toLowerCase())
  );

  const handlePesquisar = (termo: string) => {
    setPesquisaTermo(termo);
  };

  return (
    <>
      <Header fluxo="verProfissionais" headerPsicologo={false} />
      <Carrossel profissionais={profissionaisFiltrados} />
      <Pesquisa onPesquisar={handlePesquisar} />
      {profissionaisFiltrados.length === 0 ? (
        <p className="mensagem-nenhum-psicologo">
          Nenhum psicólogo com esse nome foi encontrado.
        </p>
      ) : (
        <CardPsicologo profissionais={profissionaisFiltrados} />
      )}
    </>
  );
}
