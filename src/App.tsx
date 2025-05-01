import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CadsatroPsicologo from '../src/pages/cadastroPsicologo/cadastroPsicologo';
import CadsatroPaciente from '../src/pages/cadastroPaciente/cadastroPaciente';
import MeuPainelPaciente from "./pages/meuPainelPaciente/meuPainel";

import LoginPsicologo from '../src/pages/loginPsicologo/loginPsicologo';
import LoginPaciente from '../src/pages/loginPaciente/loginPaciente';

import ListagemPacientes from "./pages/listagemPaciente/listagemPaciente";

function App() {
  return (
    <Router>
      <Routes>
        {/* FLUXO DE PACIENTE */}
        {/* <Route path="/" element={<LoginPaciente />} />
        <Route path="/cadastroPaciente" element={<CadsatroPaciente />} /> */}

        {/* FLUXO DE PSICOLOGO */}
        {/* <Route path="/" element={<LoginPsicologo />} />
        <Route path="/cadastroPsicologo" element={<CadsatroPsicologo />} /> */}
        <Route path="/listagemPacientes" element={<ListagemPacientes />} />
        <Route path="/meuPainelPaciente" element={<MeuPainelPaciente />} />
      </Routes>  
    </Router>
  )
}

export default App