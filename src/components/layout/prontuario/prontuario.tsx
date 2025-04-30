import './prontuario.css';
import Documento from "../../../assets/Documento.svg";

interface ProntuarioProps {
    nomePaciente: string;
    titulo: string;
    onClickAbrir?: () => void;
    fotoPerfilUrl?: string;
}

function Prontuario({
    nomePaciente,
    titulo,
    onClickAbrir,
    fotoPerfilUrl
}: ProntuarioProps) {
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
                    onClick={onClickAbrir}
                >
                    Abrir Prontuário
                </button>
            </div>
        </div>
    );
}

export default Prontuario;