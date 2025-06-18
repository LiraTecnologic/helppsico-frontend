import './prontuario.css';
import Documento from "../../../assets/Documento.svg";
import { useNavigate } from 'react-router-dom';

interface ProntuarioProps {
    nomePaciente: string;
    titulo: string;
    fotoPerfilUrl?: string;
    idProntuario: string;
}

function Prontuario({
    nomePaciente,
    titulo,
    idProntuario,
    fotoPerfilUrl }: ProntuarioProps
) {

    const navigate = useNavigate();

    function abrirProntuario() {
        navigate(`/detalhesProntuario/${idProntuario}`);
    }

    return (
        <div className="prontuarioContainer">
            <div className="prontuarioHeader">
                <img
                    src={fotoPerfilUrl}
                    alt="Foto do Paciente"
                    className="prontuarioFotoPerfil"
                />
                <span className="prontuarioNomePaciente">{nomePaciente}</span>
            </div>

            <div className="prontuarioCard">
                <div className="prontuarioCardHeader">
                    <img src={Documento} alt="" />

                    <div className="prontuarioIcone" />
                    <strong className="prontuarioTitulo">{titulo}</strong>
                </div>

                <button
                    className="prontuarioBotaoAbrir"
                    onClick={abrirProntuario}
                >
                    Abrir Prontuário
                </button>
            </div>
        </div>
    );
}

export default Prontuario;