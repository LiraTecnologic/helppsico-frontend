import './cadastroProntuarios.css';
import Header from '../../components/layout/header/header';
import { useState, ChangeEvent, useEffect } from 'react';
import PacienteModel from '../../models/paciente';
import ConsultaModel from '../../models/consulta';
import { formataIdentificacao } from '../../utils/formataIdentificacaoConsulta'
import ProntuarioModel from '../../models/prontuario';
import { consultaVinculosPsicologo } from '../../services/vinculos.service';
import { consultarSessoesAntigasPsicologo } from '../../services/consultas.service';
import { cadastar } from '../../services/prontuarios.service';
import { apresentarErro, notificarSucesso } from '../../utils/notificacoes';

export default function CadastroProntuarios() {

    const [pacientes, setPacientes] = useState<PacienteModel[]>([]);
    const [consultas, setConsultas] = useState<ConsultaModel[]>([]);
    const [titulo, setTitulo] = useState('');
    const [pacienteSelecionado, setPacienteSelecionado] = useState('');
    const [consultaSelecionada, setConsultaSelecionada] = useState('');
    const [conteudo, setConteudo] = useState('');

    const handlePacienteChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPacienteSelecionado(e.target.value);
        setConsultaSelecionada('');
    };

    const consultasFiltradas = consultas.filter(
        (c) => c.paciente.id.toString() === pacienteSelecionado
    );

    async function salvar() {
        if (!pacienteSelecionado || !consultaSelecionada || !conteudo || !titulo) {
            apresentarErro('Preencha todos os campos!');
            return;
        }

        const pacienteCompleto = pacientes.find(p => p.id.toString() === pacienteSelecionado);
        const consultaCompleta = consultas.find(c => c.id.toString() === consultaSelecionada);

        if (!pacienteCompleto) {
            apresentarErro('Paciente inválido!');
            return;
        }

        if (!consultaCompleta) {
            apresentarErro('Paciente inválido!');
            return;
        }

        const novoProntuario: ProntuarioModel = {
            id: "",
            titulo,
            conteudo,
            consulta: consultaCompleta,
            psicologo: consultaCompleta.psicologo,
            paciente: pacienteCompleto,
            dataCriacao: '',
            dataEdicao: ''
        };

        try {
            const prontuarioSalvo = await cadastar(novoProntuario);
            console.log('Prontuario salvo com sucesso.', prontuarioSalvo);
            notificarSucesso('Prontuário salvo com sucesso!');
            window.location.reload(); 
        } catch (error) {
            console.error('Erro ao salvar prontuário:', error);
            apresentarErro('Erro ao salvar prontuário!');
        }
    }


    useEffect(() => {
        async function carregarPacientes(idPsicologo: string) {
            const vinculos = await consultaVinculosPsicologo(idPsicologo, 0);

            if (vinculos.dado) {
                const pacientes = vinculos.dado.content.map(vinculo => vinculo.paciente);
                setPacientes(pacientes);
            }
        }

        async function carregarConsultas(idPsicologo: string) {
            const consultas = await consultarSessoesAntigasPsicologo(idPsicologo, 0);

            if(consultas.dado) {
                setConsultas(consultas.dado.content);
            }
        }

        const idPsicologo = localStorage.getItem('id-psicologo');

        if (idPsicologo) {
            carregarPacientes(idPsicologo);
            carregarConsultas(idPsicologo);
        }
    }, []);

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
                                {consultasFiltradas.map((c) => (
                                    <option key={c.id} value={c.id}>
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