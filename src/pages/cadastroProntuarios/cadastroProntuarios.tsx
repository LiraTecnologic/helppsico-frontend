import './cadastroProntuarios.css';
import Header from '../../components/layout/header/header';
import CriarProntuario from '../../components/layout/criarProntuario/criarProntuario';

export default function CadatroProntuarios (){

    const pacientes = [
        { paciente: 'joao vitor', id: 1 },
        { paciente: 'vitor', id: 2 },
        { paciente: 'ana clara', id: 3 },
        { paciente: 'marcos paulo', id: 4 },
        { paciente: 'beatriz', id: 5 }
    ];

    const consultas = [
        { idPaciente: 1, consulta: "Consulta 1", data: "10/05" },
        { idPaciente: 1, consulta: "Consulta 2", data: "15/05" },
        { idPaciente: 2, consulta: "Retorno", data: "09/05" },
        { idPaciente: 3, consulta: "Primeira sessão", data: "08/05" },
        { idPaciente: 4, consulta: "Sessão de acompanhamento", data: "06/05" },
        { idPaciente: 5, consulta: "Sessão emergencial", data: "05/05" },
        { idPaciente: 3, consulta: "Retorno", data: "12/05" }
    ];

    return (
        <>
            <Header fluxo='' headerPsicologo={true} />
            <CriarProntuario pacientes={pacientes} consultas={consultas} />
        </>
    );
}