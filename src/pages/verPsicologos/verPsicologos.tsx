import { useState } from 'react';
import './verPsicologos.css';
import Header from '../../components/layout/header/header';
import CardPsicologo from '../../components/layout/Cards/cardPsicologo/cardPsicologo';
import Pesquisa from '../../components/layout/pesquisa/pesquisa';

export default function VerPsicologos() {
  const [pesquisaTermo, setPesquisaTermo] = useState('');
  
  const Profissionais = [
    { urlFoto: "https://media.licdn.com/dms/image/v2/D4D03AQE9s6XSSgEkGQ/profile-displayphoto-shrink_200_200/B4DZRLc0GQHMAY-/0/1736432632643?e=1752105600&v=beta&t=ojYHnFhp6RiKVeywIO9heVyimEqhFjNjsj4nDbJzJu8", nome: "Cris Guedes", idade: 23, crp: "XXX", mediaAvaliacoes: 4.3, quantidadeAvaliacoes:51, biografia:"Presidente da furia e grande pnc sem carisma" },
    { urlFoto: "https://media.licdn.com/dms/image/v2/D4D03AQE9s6XSSgEkGQ/profile-displayphoto-shrink_200_200/B4DZRLc0GQHMAY-/0/1736432632643?e=1752105600&v=beta&t=ojYHnFhp6RiKVeywIO9heVyimEqhFjNjsj4nDbJzJu8", nome: "Julio balestrim", idade: 23, crp: "XXX", mediaAvaliacoes: 4.3, quantidadeAvaliacoes:51, biografia:"Presidente da furia e grande pnc sem carisma" },
    { urlFoto: "https://media.licdn.com/dms/image/v2/D4D03AQE9s6XSSgEkGQ/profile-displayphoto-shrink_200_200/B4DZRLc0GQHMAY-/0/1736432632643?e=1752105600&v=beta&t=ojYHnFhp6RiKVeywIO9heVyimEqhFjNjsj4nDbJzJu8", nome: "Cris Guedes", idade: 23, crp: "XXX", mediaAvaliacoes: 4.3, quantidadeAvaliacoes:51, biografia:"Presidente da furia e grande pnc sem carisma" }
  ];

  const profissionaisFiltrados = Profissionais.filter((psicologo) =>
    psicologo.nome.toLowerCase().includes(pesquisaTermo.toLowerCase())
  );

  const handlePesquisar = (termo: string) => {
    setPesquisaTermo(termo);
  };

  return (
    <>
      <Header fluxo='verProfissionais' />
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