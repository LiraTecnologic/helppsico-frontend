import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CadsatroPaciente from '../src/pages/cadastroPaciente/cadastroPaciente';

import LoginPsicologo from '../src/pages/loginPsicologo/loginPsicologo';
import LoginPaciente from '../src/pages/loginPaciente/loginPaciente';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cadsatro />} />
      </Routes>  
    </Router>
  )
}

export default App