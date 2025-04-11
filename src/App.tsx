import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cadsatro from '../src/pages/cadastroPsicologo/cadastroPsicologo';

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