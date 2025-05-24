import { useEffect, useState } from 'react';
import './verPsicologos.css';
import Header from '../../components/layout/header/header';
import CardPsicologo from '../../components/layout/Cards/cardPsicologo/cardPsicologo';
import Pesquisa from '../../components/layout/pesquisa/pesquisa';
import Carrossel from '../../components/layout/carrossel/carrossel';
import { listarPsicologos } from '../../services/listarPsicologos.service';
import PsicologoModel from '../../models/psicologo';

interface CardPsicologoProps {
  urlFoto: string;
  nome: string;
  idade: number;
  crp: string;
  mediaAvaliacoes: number;
  quantidadeAvaliacoes: number;
  biografia: string;
}

const calcularIdade = (dataNascimento: string) => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
};

function mapParaCardPsicologo(psicologo: PsicologoModel): CardPsicologoProps {
  return {
    urlFoto: psicologo.fotoUrl,
    nome: psicologo.nome,
    idade: calcularIdade(psicologo.dataNascimento),
    crp: psicologo.crp,
    mediaAvaliacoes: 4.5,
    quantidadeAvaliacoes: 10,
    biografia: psicologo.biografia,
  };
}

export default function VerPsicologos() {
  const [pesquisaTermo, setPesquisaTermo] = useState('');
  const [profissionais, setProfissionais] = useState<PsicologoModel[]>([]);

  useEffect(() => {
    listarPsicologos().then(setProfissionais);
  }, []);

  const profissionaisFiltrados = profissionais.filter((psicologo) =>
    psicologo.nome.toLowerCase().includes(pesquisaTermo.toLowerCase())
  );

  const profissionaisParaCard = profissionaisFiltrados.map(mapParaCardPsicologo);

  const handlePesquisar = (termo: string) => {
    setPesquisaTermo(termo);
  };

  return (
    <>
      <Header fluxo="verProfissionais" headerPsicologo={false}/>
      <Carrossel profissionais={profissionais} />
      <Pesquisa onPesquisar={handlePesquisar} />
      {profissionaisParaCard.length === 0 ? (
        <p className="mensagem-nenhum-psicologo">
          Nenhum psicólogo com esse nome foi encontrado.
        </p>
      ) : (
        <CardPsicologo profissionais={profissionaisParaCard} />
      )}
    </>
  );
}
