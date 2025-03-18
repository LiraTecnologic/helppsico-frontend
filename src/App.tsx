import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../src/pages/login/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>  
    </Router>
  )
}

export default App
