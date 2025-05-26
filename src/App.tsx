import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Telas do fluxo de Paciente
import LoginPaciente from '../src/pages/loginPaciente/loginPaciente';
import CadsatroPaciente from '../src/pages/cadastroPaciente/cadastroPaciente';
import MeuPainelPaciente from "./pages/meuPainelPaciente/meuPainel";
import DetalhesSessao from "./pages/minhasConsultasPaciente/minhasConsultasPaciente";
import VerPsicologos from "./pages/verPsicologos/verPsicologos";
import InformacoesPsicologo from "./pages/informacoesPsicologo/informacoesPsicologo";
import SolicitacaoDeVinculo from "./pages/solicitacaoDeVinculo/solicitiacaoDeVinculo";

// Telas do fluxo de Pscicologo
import LoginPsicologo from '../src/pages/loginPsicologo/loginPsicologo';
import CadsatroPsicologo from '../src/pages/cadastroPsicologo/cadastroPsicologo';
import ListagemProntuario from "./pages/listagemProntuario/listagemProntuario";
import ListagemPacientes from "./pages/listagemPaciente/listagemPaciente";
import MeuPainelPsicologo from "./pages/meuPainelPsicologo/meuPainelPsicologo";
import GerenciamentoDeHorarios from "./pages/gereciamentoHorarios/gerenciamentoHorarios";
import CadastroProntuarios from "./pages/cadastroProntuarios/cadastroProntuarios";
import DetalhesProntuario from "./pages/detalhesProntuario/detalhesProntuario";

//Nenhum fluxo
import ValidacaoCrp from "./pages/validacaoCrp/validacaoCrp";


function App() {
  return (


    <Router>
      <Routes>
        {/* FLUXO DE PACIENTE */}
        <Route path="/loginPaciente" element={<LoginPaciente />} />
        <Route path="/cadastroPaciente" element={<CadsatroPaciente />} />
        <Route path="/meuPainelPaciente" element={<MeuPainelPaciente />} />
        <Route path="/detalhesSessao" element={<DetalhesSessao />} />
        <Route path="/psicologos" element={<VerPsicologos />} />
        <Route path="/informacoesPsicologo" element={<InformacoesPsicologo />} />
        <Route path="/solicitacaoVinculo" element={<SolicitacaoDeVinculo />} />

        {/* FLUXO DE PSICOLOGO */}
        <Route path="/loginPsicologo" element={<LoginPsicologo />} />
        <Route path="/cadastroPsicologo" element={<CadsatroPsicologo />} />
        <Route path="/listagemDocumentos" element={<ListagemProntuario />} />
        <Route path="/listagemPacientes" element={<ListagemPacientes />} />
        <Route path="/listagemProntuarios" element={<ListagemProntuario />} />
        <Route path="/meuPainelPsicologo" element={<MeuPainelPsicologo />} />
        <Route path="/gerenciamentoHorarios" element={<GerenciamentoDeHorarios />} /> 
        <Route path="/cadastroDeProntuario" element={<CadastroProntuarios />} />
        <Route path="/detalhesProntuario" element={<DetalhesProntuario />} />

        {/* Nenhum fluxo */}
        <Route path="/validacaoCrp" element={<ValidacaoCrp />} />

      </Routes>
      <ToastContainer/>
    </Router>
  )
}

export default App