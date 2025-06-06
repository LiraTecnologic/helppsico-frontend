// import { useEffect, useState } from "react";
// import Header from "../../components/layout/header/header";
// import Estrela from "../../assets/estrela.svg";
// import Localizacao from "../../assets/localização.svg";
// import TabelaHorario from "../../components/layout/tabela/tabelaHorario";
// import CardInfoAvaliacao from "../../components/layout/Cards/cardsInformacoesPsicologo/avaliacao/info/cardInfoAvaliacao";
// import BotaoAvaliarInfoPsicologo from "../../components/layout/Cards/cardsInformacoesPsicologo/botaoAvaliar/botaoAvaliarInfoPsicologo";
// import CardAvaliacao from "../../components/layout/Cards/cardsInformacoesPsicologo/avaliacao/cardAvaliacao";

// import {
//   consultaPsicologo,
//   consultaAvaliacoes,
//   consultaHorarios,
// } from "./informacoesPsicologoService";

// import PsicologoModel from "../../models/psicologo";
// import { AvaliacaoModel } from "../../models/avaliacao";
// import { HorarioModel } from "../../models/horario";
// import "./informacoesPsicologo.css";

// export default function InformacoesPsicologo() {
//   const [psicologo, setPsicologo] = useState<PsicologoModel | null>(null);
//   const [avaliacoes, setAvaliacoes] = useState<AvaliacaoModel[]>([]);
//   const [mediaNotaAvaliacao, setMediaNotaAvaliacao] = useState("0");
//   const [quantidadeVinculados, setQuantidadeVinculados] = useState(0);
//   const [horarios, setHorarios] = useState<HorarioModel[]>([]);

//   useEffect(() => {
//     async function fetchData() {
//       const id = 1;

//       try {
//         const [psicologoData, avaliacoesData, horariosData] = await Promise.all([
//           consultaPsicologo(id),
//           consultaAvaliacoes(),
//           consultaHorarios(id),
//         ]);
//         console.log(horariosData)

//         setPsicologo(psicologoData);

//         // Filtra avaliações do psicólogo atual (id)
//         const avaliacoesFiltradas = avaliacoesData.filter(
//           (a) => a.psicologo?.id?.toString() === id.toString()
//         );
//         setAvaliacoes(avaliacoesFiltradas);

//         const somaNotas = avaliacoesFiltradas.reduce(
//           (acc: number, cur: AvaliacaoModel) => acc + cur.nota,
//           0
//         );
//         const media =
//           avaliacoesFiltradas.length > 0
//             ? somaNotas / avaliacoesFiltradas.length
//             : 0;
//         setMediaNotaAvaliacao(media.toFixed(1));

//         setQuantidadeVinculados(12);

//         setHorarios(horariosData);
//       } catch (error) {
//         console.error("Erro ao buscar dados:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   function calcularSessoes(
//     inicio: string | undefined,
//     fim: string | undefined,
//     duracao: number,
//     intervalo: number
//   ): string[] {
//     if (!inicio || !fim) return [];

//     const horarios: string[] = [];
//     const [hInicio, mInicio] = inicio.split(":").map(Number);
//     const [hFim, mFim] = fim.split(":").map(Number);
//     let inicioEmMinutos = hInicio * 60 + mInicio;
//     const fimEmMinutos = hFim * 60 + mFim;

//     while (inicioEmMinutos + duracao <= fimEmMinutos) {
//       const hora = Math.floor(inicioEmMinutos / 60)
//         .toString()
//         .padStart(2, "0");
//       const minuto = (inicioEmMinutos % 60).toString().padStart(2, "0");
//       horarios.push(`${hora}:${minuto}`);
//       inicioEmMinutos += duracao + intervalo;
//     }

//     return horarios;
//   }

//   if (!psicologo) {
//     return <p>Carregando...</p>;
//   }

//   return (
//     <>
//       <Header fluxo="" headerPsicologo={false} />
//       <main className="main-info-psicologico">
//         <div className="div-psicologo">
//           <img
//             src={psicologo.fotoUrl || "https://via.placeholder.com/150"}
//             alt="Foto psicólogo"
//           />
//           <h1>
//             {psicologo.nome} ({mediaNotaAvaliacao}{" "}
//             <img src={Estrela} alt="Icon estrela" />)
//           </h1>
//           <button>Vincular</button>
//           <div>
//             <p>
//               {quantidadeVinculados} vinculados | {avaliacoes.length} avaliações
//             </p>
//             <p>CRP {psicologo.crp}</p>
//             <p>{psicologo.email}</p>
//             <p>{psicologo.telefone}</p>
//           </div>
//           <hr />
//           <div>
//             <p>Local de atendimento:</p>
//             <p>
//               <img src={Localizacao} alt="Icon localização" />
//               {psicologo.enderecoAtendimento?.rua},{" "}
//               {psicologo.enderecoAtendimento?.numero}.
//             </p>
//           </div>
//         </div>

//         <div className="div-direita">
//           <section className="section-psico-bio">
//             <div className="div-bio-psico">
//               <h2>Biografia</h2>
//               <p>{psicologo.biografia}</p>
//             </div>
//           </section>

//           <section className="section-tabela">
//             <h2>Horários de consulta:</h2>

//             {horarios.length === 0 ? (
//               <p>Sem horários cadastrados</p>
//             ) : (
//               horarios.map((h, i) => {
                
//                 const dias = Array.isArray(h.diaSemana) ? h.diaSemana : [];

//                 const horariosInicio = calcularSessoes(
//                   h.inicio,
//                   h.fim,
//                   h.duracao,
//                   h.intervalo
//                 );

//                 return (
//                   <TabelaHorario
//                     key={h.id || i}
//                     diasSelecionados={dias}
//                     horariosInicio={horariosInicio}
//                   />
//                 );
//               })
//             )}
//           </section>

//           <section className="section-avaliacao">
//             <h2>Avaliações e comentários:</h2>
//             <div className="cards-section-avaliacao">
//               <CardInfoAvaliacao
//                 nota={parseFloat(mediaNotaAvaliacao)}
//                 quantidadeAvaliacao={avaliacoes.length.toString()}
//               />
//               <BotaoAvaliarInfoPsicologo />
//             </div>
//             <div className="listagem-avaliacao">
//               {avaliacoes.map((avaliacao, index) => (
//                 <CardAvaliacao
//                   key={index}
//                   fotoPaciente={avaliacao.paciente.fotoUrl || ""}
//                   nomePaciente={avaliacao.paciente.nome}
//                   data={avaliacao.data}
//                   conteudo={avaliacao.comentario}
//                   nota={avaliacao.nota}
//                 />
//               ))}
//             </div>
//           </section>
//         </div>
//       </main>
//     </>
//   );
// }