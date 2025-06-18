import React, { useState } from "react";
import "./Pesquisa.css";
import Lupa from "../../../assets/lupa.svg";

interface PesquisaProps {
  onPesquisar: (termo: string) => void;
}

export default function Pesquisa({ onPesquisar }: PesquisaProps) {
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPesquisar(termoPesquisa);
  };

  return (
    <div className="container-pesquisa">
      <h2 className="titulo-pesquisa">
        Ou pesquise pelo nome do seu profissional
      </h2>
      <form onSubmit={handleSubmit} className="form-pesquisa">
        <input
          type="text"
          placeholder="Digite o nome do psicólogo..."
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          className="input-pesquisa"
        />
        <button type="submit" className="btn-pesquisar">
          <img src={Lupa} alt="Pesquisar" className="icone-pesquisa" />
        </button>
      </form>
    </div>
  );
}