import './cadastroProntuarios.css';
import Header from '../../components/layout/header/header';
import { useState, ChangeEvent } from 'react';
import PacienteModel from '../../models/paciente';
import ConsultaModel from '../../models/consulta';
import { formataIdentificacao } from '../../utils/formataIdentificacaoConsulta'
import ProntuarioModel from '../../models/prontuario';

export default function CadastroProntuarios() {

    const [pacientes, setPacientes] = useState<PacienteModel[]>([]); 
    const [consultas, setConsultas] = useState<ConsultaModel[]>([]);
    const [titulo, setTitulo] = useState('');
    const [prontuario, setProntuario] = useState<ProntuarioModel | null>(null)
    const [pacienteSelecionado, setPacienteSelecionado] = useState('');
    const [consultaSelecionada, setConsultaSelecionada] = useState('');
    const [conteudo, setConteudo] = useState('');

    const handlePacienteChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPacienteSelecionado();
        setConsultaSelecionada('');
    };

    const consultasFiltradas = consultas.filter(
        (c) => c.paciente.id.toString() === pacienteSelecionado
    );

    function salvar() {
        
    }

    return (
        <>
            <Header fluxo='' headerPsicologo={true} />
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
                                        {p.nome}
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
                                    <option key={index} value={formataIdentificacao(c.id)}>
                                        {formataIdentificacao(c.id)}
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
                            rows={10}
                        />
                    </div>

                    <div className="botoes">
                        <button className="btn-cancelar" onClick={() => window.location.reload()}>
                            Cancelar
                        </button>
                        <button
                            className="btn-salvar"
                            onClick={salvar}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}