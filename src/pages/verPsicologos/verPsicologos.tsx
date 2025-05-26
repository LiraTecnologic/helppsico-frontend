import { useEffect, useState } from "react";
import "./verPsicologos.css";
import Header from "../../components/layout/header/header";
import CardPsicologo from "../../components/layout/Cards/cardPsicologo/cardPsicologo";
import Pesquisa from "../../components/layout/pesquisa/pesquisa";
import Carrossel from "../../components/layout/carrossel/carrossel";
import { listarPsicologos } from "../../services/listarPsicologos.service";
import { listarAvaliacoesPorPsicologo } from "../../services/listarAvaliacoesPorPsicologo";
import PsicologoModel from "../../models/psicologo";
import calcular from "../../utils/calculoData";
import calcularMedia from "../../utils/mediaAvaliacao";
import qtdeAvaliacao from "../../utils/qtdeAvaliacao";
import { AvaliacaoModel } from "../../models/avaliacoes";

type ProfissionalCard = {
  urlFoto: string;
  nome: string;
  idade: number;
  crp: string;
  mediaAvaliacoes: number;
  quantidadeAvaliacoes: number;
  biografia: string;
};

interface PsicologoCompilado {
  psicologo: PsicologoModel;
  avaliacao: AvaliacaoModel[];
}

export default function VerPsicologos() {
  const [pesquisaTermo, setPesquisaTermo] = useState("");
  const [profissionais, setProfissionais] = useState<ProfissionalCard[]>([]);
  const [psicologos, setPsicologos] = useState<PsicologoCompilado[]>([]);

  useEffect(() => {
    async function carregarPsicologos(): Promise<PsicologoCompilado[]> {
      const listaPsicologos = await listarPsicologos();
      const compiladoPromises = listaPsicologos.map(async (psicologo) => {
        const avaliacoes = await listarAvaliacoesPorPsicologo(psicologo.id);
        return {
          psicologo,
          avaliacao: avaliacoes,
        } as PsicologoCompilado;
      });

      return await Promise.all(compiladoPromises);
    }

    const propsCompilados =  await carregarPsicologos();
    setPsicologos(propsCompilados)

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
