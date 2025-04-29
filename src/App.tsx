import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CadsatroPsicologo from '../src/pages/cadastroPsicologo/cadastroPsicologo';
import CadsatroPaciente from '../src/pages/cadastroPaciente/cadastroPaciente';
import MeuPainelPaciente from "./pages/meuPainelPaciente/meuPainel";
import SolicitacaoDeVinculo from '../src/pages/solicitacaoDeVinculo/solicitiacaoDeVinculo';

import LoginPsicologo from '../src/pages/loginPsicologo/loginPsicologo';
import LoginPaciente from '../src/pages/loginPaciente/loginPaciente';

import ListagemProntuario from "../src/pages/listagemProntuario/listagemProntuario";


function App() {
  return (
    <Router>
      <Routes>
    
        {/* FLUXO DE PACIENTE */}
        {/* <Route path="/" element={<LoginPaciente />} />
        <Route path="/cadastroPaciente" element={<CadsatroPaciente />} /> */}
        <Route path="/" element={<SolicitacaoDeVinculo />} />
      

        {/* FLUXO DE PSICOLOGO */}
        {/* <Route path="/" element={<LoginPsicologo />} />
        <Route path="/cadastroPsicologo" element={<CadsatroPsicologo />} /> */}
        <Route path="/" element={<MeuPainelPaciente />} />

        <Route path="/" element={<ListagemProntuario />}></Route>

      </Routes>  
    </Router>
  )
}

export default App