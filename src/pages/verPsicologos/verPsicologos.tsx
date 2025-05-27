import { useState } from "react";
import "./verPsicologos.css";
import { useLocation } from "react-router-dom";
import Header from "../../components/layout/header/header";
import CardPsicologo from "../../components/layout/Cards/cardPsicologo/cardPsicologo";
import Pesquisa from "../../components/layout/pesquisa/pesquisa";
import Carrossel from "../../components/layout/carrossel/carrossel";
import { useEffect } from "react";

export default function VerPsicologos() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [pesquisaTermo, setPesquisaTermo] = useState("");

  const Profissionais = [
    {
      urlFoto: "https://randomuser.me/api/portraits/men/1.jpg",
      nome: "Lucas Silva",
      idade: 28,
      crp: "CRP-1234",
      mediaAvaliacoes: 4.7,
      quantidadeAvaliacoes: 120,
      biografia:
        "Psicólogo especializado em transtornos de ansiedade e depressão.",
    },
    {
      urlFoto: "https://randomuser.me/api/portraits/men/2.jpg",
      nome: "Ana Pereira",
      idade: 34,
      crp: "CRP-5678",
      mediaAvaliacoes: 4.3,
      quantidadeAvaliacoes: 95,
      biografia:
        "Psicóloga clínica com experiência em terapia cognitivo-comportamental.",
    },
    {
      urlFoto: "https://randomuser.me/api/portraits/men/3.jpg",
      nome: "Marcos Costa",
      idade: 41,
      crp: "CRP-9101",
      mediaAvaliacoes: 5.0,
      quantidadeAvaliacoes: 200,
      biografia: "Psicólogo com foco em psicoterapia de casais e famílias.",
    },
    {
      urlFoto: "https://randomuser.me/api/portraits/men/4.jpg",
      nome: "Beatriz Santos",
      idade: 29,
      crp: "CRP-1122",
      mediaAvaliacoes: 3.8,
      quantidadeAvaliacoes: 80,
      biografia: "Especialista em transtornos alimentares e autoimagem.",
    },
    {
      urlFoto: "https://randomuser.me/api/portraits/men/5.jpg",
      nome: "Carlos Souza",
      idade: 38,
      crp: "CRP-2233",
      mediaAvaliacoes: 4.2,
      quantidadeAvaliacoes: 150,
      biografia:
        "Psicólogo com abordagem integrativa para tratamento de trauma.",
    },
    {
      urlFoto: "https://randomuser.me/api/portraits/men/6.jpg",
      nome: "Juliana Oliveira",
      idade: 32,
      crp: "CRP-3344",
      mediaAvaliacoes: 4.9,
      quantidadeAvaliacoes: 210,
      biografia:
        "Psicóloga especializada em mindfulness e técnicas de relaxamento.",
    },
    {
      urlFoto: "https://randomuser.me/api/portraits/men/7.jpg",
      nome: "Ricardo Almeida",
      idade: 40,
      crp: "CRP-4455",
      mediaAvaliacoes: 4.6,
      quantidadeAvaliacoes: 110,
      biografia: "Psicoterapeuta com foco em superação de fobias e medos.",
    },
    {
      urlFoto: "https://randomuser.me/api/portraits/men/8.jpg",
      nome: "Fernanda Lima",
      idade: 25,
      crp: "CRP-5566",
      mediaAvaliacoes: 3.5,
      quantidadeAvaliacoes: 65,
      biografia:
        "Psicóloga com atuação em jovens e adultos em processos de autoconhecimento.",
    },
    {
      urlFoto: "https://randomuser.me/api/portraits/men/9.jpg",
      nome: "Roberta Martins",
      idade: 36,
      crp: "CRP-6677",
      mediaAvaliacoes: 4.4,
      quantidadeAvaliacoes: 130,
      biografia:
        "Especialista em psicoterapia para dependência emocional e relacionamentos abusivos.",
    },
    {
      urlFoto: "https://randomuser.me/api/portraits/men/10.jpg",
      nome: "Felipe Gomes",
      idade: 33,
      crp: "CRP-7788",
      mediaAvaliacoes: 4.8,
      quantidadeAvaliacoes: 180,
      biografia: "Psicólogo focado em coaching e desenvolvimento pessoal.",
    },
    {
      urlFoto: "https://randomuser.me/api/portraits/men/11.jpg",
      nome: "Larissa Silva",
      idade: 27,
      crp: "CRP-8899",
      mediaAvaliacoes: 3.9,
      quantidadeAvaliacoes: 110,
      biografia: "Psicóloga especialista em terapia de casal e sexualidade.",
    },
    {
      urlFoto: "https://randomuser.me/api/portraits/men/12.jpg",
      nome: "Gustavo Oliveira",
      idade: 39,
      crp: "CRP-9900",
      mediaAvaliacoes: 4.1,
      quantidadeAvaliacoes: 140,
      biografia: "Psicoterapeuta com ênfase em transtornos de humor.",
    },
    {
      urlFoto: "https://randomuser.me/api/portraits/men/13.jpg",
      nome: "Carla Costa",
      idade: 30,
      crp: "CRP-1011",
      mediaAvaliacoes: 4.0,
      quantidadeAvaliacoes: 95,
      biografia:
        "Psicóloga com foco em transtornos de personalidade e crises existenciais.",
    },
    {
      urlFoto: "https://randomuser.me/api/portraits/men/14.jpg",
      nome: "Thiago Martins",
      idade: 35,
      crp: "CRP-1213",
      mediaAvaliacoes: 4.5,
      quantidadeAvaliacoes: 160,
      biografia:
        "Psicólogo clínico com abordagem focada no tratamento de estresse e ansiedade.",
    },
    {
      urlFoto: "https://randomuser.me/api/portraits/men/15.jpg",
      nome: "Isabela Santos",
      idade: 31,
      crp: "CRP-1314",
      mediaAvaliacoes: 4.2,
      quantidadeAvaliacoes: 125,
      biografia:
        "Psicóloga especializada em terapia cognitivo-comportamental para adolescentes.",
    },
  ];

  const profissionaisFiltrados = Profissionais.filter((psicologo) =>
    psicologo.nome.toLowerCase().includes(pesquisaTermo.toLowerCase())
  );

  const handlePesquisar = (termo: string) => {
    setPesquisaTermo(termo);
  };

  const location = useLocation();
  const headerPsicologo = location.state.headerPsicologo;

  return (
    <>
      <Header fluxo="verProfissionais" headerPsicologo={headerPsicologo} />
      <Carrossel
        profissionais={Profissionais}
        headerPsicologo={headerPsicologo}
      />
      <Pesquisa onPesquisar={handlePesquisar} />
      {profissionaisFiltrados.length === 0 ? (
        <p className="mensagem-nenhum-psicologo">
          Nenhum psicólogo com esse nome foi encontrado.
        </p>
      ) : (
        <CardPsicologo
          profissionais={profissionaisFiltrados}
          headerPsicologo={headerPsicologo}
        />
      )}
    </>
  );
}