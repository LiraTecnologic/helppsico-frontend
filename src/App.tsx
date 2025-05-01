import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Telas do fluxo de Paciente
import LoginPaciente from '../src/pages/loginPaciente/loginPaciente';
import CadsatroPaciente from '../src/pages/cadastroPaciente/cadastroPaciente';
import MeuPainelPaciente from "./pages/meuPainelPaciente/meuPainel";
import DetalhesSessao from "./pages/detalhesSessao/detalhesSessao";

// Telas do fluco de Pscicologo
import LoginPsicologo from '../src/pages/loginPsicologo/loginPsicologo';
import CadsatroPsicologo from '../src/pages/cadastroPsicologo/cadastroPsicologo';
import ListagemProntuario from "./pages/listagemProntuario/listagemProntuario";

import ListagemPacientes from "./pages/listagemPaciente/listagemPaciente";

function App() {
  return (
    <Router>
      <Routes>
        {/* FLUXO DE PACIENTE */}
        <Route path="loginPaciente" element={<LoginPaciente />} />
        <Route path="/cadastroPaciente" element={<CadsatroPaciente />} />
        <Route path="/meuPainel" element={<MeuPainelPaciente />} />
        <Route path="/detalhesSessao" element={<DetalhesSessao />} />

        {/* FLUXO DE PSICOLOGO */}
        <Route path="/loginPsicologo" element={<LoginPsicologo />} />
        <Route path="/cadastroPsicologo" element={<CadsatroPsicologo />} />
        <Route path="/listagemDocumentos" element={<ListagemProntuario />} />
        
      </Routes>  
    </Router>
  )
}

export default App