import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Telas do fluxo de Paciente
import LoginPaciente from "../src/pages/loginPaciente/loginPaciente";
import CadastroPaciente from "../src/pages/cadastroPaciente/cadastroPaciente";
import MeuPainelPaciente from "./pages/meuPainelPaciente/meuPainel";
import DetalhesSessao from "./pages/minhasConsultasPaciente/minhasConsultasPaciente";
import VerPsicologos from "./pages/verPsicologos/verPsicologos";
import InformacoesPsicologo from "./pages/informacoesPsicologo/informacoesPsicologo";
import SolicitacaoDeVinculo from "./pages/solicitacaoDeVinculo/solicitiacaoDeVinculo";
import AgendamentoConsulta from "./pages/agendamentoConsulta/agendamentoConsulta";
import SolicitacaoDocumento from "./pages/solicitacaoDocumento/solicitacaoDocumento";

// Telas do fluxo de Psicologo
import LoginPsicologo from "../src/pages/loginPsicologo/loginPsicologo";
import CadastroPsicologo from "../src/pages/cadastroPsicologo/cadastroPsicologo";
import ListagemProntuario from "./pages/listagemProntuario/listagemProntuario";
import ListagemPacientes from "./pages/listagemPaciente/listagemPaciente";
import MeuPainelPsicologo from "./pages/meuPainelPsicologo/meuPainelPsicologo";
import GerenciamentoDeHorarios from "./pages/gereciamentoHorarios/gerenciamentoHorarios";
import CadastroProntuarios from "./pages/cadastroProntuarios/cadastroProntuarios";
import DetalhesProntuario from "./pages/detalhesProntuario/detalhesProntuario";
import SolicitacaoVinculoPsicologo from "./pages/solicitacaoVinculoPsicologo/solicitacaoVinculo";
import RequisicaoDocumento from "./pages/solicitacaoDocumentoPsicologo/requisicaoDocumento";

// Nenhum fluxo
import ValidacaoCrp from "./pages/validacaoCrp/validacaoCrp";



function App() {
  return (
    <Router>
      <Routes>
        {/* FLUXO DE PACIENTE */}
        <Route path="/paciente/login" element={<LoginPaciente />} />
        <Route path="/paciente/cadastro" element={<CadastroPaciente />} />
        <Route path="/paciente/painel" element={<MeuPainelPaciente />} />
        <Route path="/paciente/sessao" element={<DetalhesSessao />} />
        <Route path="/paciente/solicitacao-vinculo" element={<SolicitacaoDeVinculo />} />
        <Route path="/paciente/agendamento" element={<AgendamentoConsulta />} />
        <Route path="/paciente/solicitacao-documento" element={<SolicitacaoDocumento />}/>

        {/* FLUXO DE PSICÓLOGO */}
        <Route path="/psicologo/login" element={<LoginPsicologo />} />
        <Route path="/psicologo/cadastro" element={<CadastroPsicologo />} />
        <Route path="/psicologo/painel" element={<MeuPainelPsicologo />} />
        <Route path="/psicologo/pacientes" element={<ListagemPacientes />} />
        <Route path="/psicologo/prontuarios" element={<ListagemProntuario />} />
        <Route path="/psicologo/prontuario/novo" element={<CadastroProntuarios />} />
        <Route path="/psicologo/prontuario/detalhes" element={<DetalhesProntuario />} />
        <Route path="/psicologo/horarios" element={<GerenciamentoDeHorarios />} />
        <Route path="/psicologo/documentos-pendentes" element={<RequisicaoDocumento />} />
        <Route path="/psicologo/solicitacao-vinculo" element={<SolicitacaoVinculoPsicologo />}/>

        {/* AMBOS OS FLUXOS */}
        <Route path="/psicologos" element={<VerPsicologos />} />
        <Route path="/informacoesPsicologo" element={<InformacoesPsicologo />} />
        
        


        {/* Nenhum fluxo */}
        <Route path="/validacaoCrp" element={<ValidacaoCrp />} />

      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;