import { useState, ChangeEvent } from 'react';
import './criarProntuario.css';

interface Paciente {
  paciente: string;
  id: number;
}

interface Consulta {
  idPaciente: number;
  consulta: string;
  data: string;
}

interface CriarProntuarioProps {
  pacientes: Paciente[];
  consultas: Consulta[];
}

export default function CriarProntuario({ pacientes, consultas }: CriarProntuarioProps) {
  const [titulo, setTitulo] = useState('');
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [consultaSelecionada, setConsultaSelecionada] = useState('');
  const [conteudo, setConteudo] = useState('');

  const handlePacienteChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPacienteSelecionado(e.target.value);
    setConsultaSelecionada('');
  };

  const consultasFiltradas = consultas.filter(
    (c) => c.idPaciente.toString() === pacienteSelecionado
  );

  return (
    <div className="container-prontuario">
      <h2 className="titulo-principal">
        Cadastro de prontuário
        <div className="linha-azul"></div>
      </h2>

      <div className="form-prontuario">
        <div className="linha-campos">
          <div className="campo">
            <label htmlFor="titulo" className="tittle-label">Título</label>
            <input
              type="text"
              id="titulo"
              placeholder="Sessão dia..."
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="campo">
            <label htmlFor="paciente" className="tittle-label">Paciente</label>
            <select
              id="paciente"
              value={pacienteSelecionado}
              onChange={handlePacienteChange}
            >
              <option value="">Escolha seu paciente</option>
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.paciente}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label htmlFor="consulta" className="tittle-label">Consulta</label>
            <select
              id="consulta"
              value={consultaSelecionada}
              onChange={(e) => setConsultaSelecionada(e.target.value)}
              disabled={!pacienteSelecionado}
            >
              <option value="">Escolha sua consulta</option>
              {consultasFiltradas.map((c, index) => (
                <option key={index} value={c.consulta}>
                  {c.consulta} - {c.data}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="campo-textarea">
          <label htmlFor="conteudo" className="tittle-label">Conteúdo</label>
          <textarea
            id="conteudo"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            rows = "10"
          />
        </div>

        <div className="botoes">
          <button className="btn-cancelar" onClick={() => window.location.reload()}>
            Cancelar
          </button>
          <button
            className="btn-salvar"
            onClick={() => {
              console.log({
                titulo,
                pacienteSelecionado,
                consultaSelecionada,
                conteudo
              });
              alert('Prontuário salvo!');
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
