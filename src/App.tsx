import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SolicitacaoDeVinculo from '../src/pages/solicitacaoDeVinculo/solicitiacaoDeVinculo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SolicitacaoDeVinculo />} />
      </Routes>  
    </Router>
  )
}

export default App