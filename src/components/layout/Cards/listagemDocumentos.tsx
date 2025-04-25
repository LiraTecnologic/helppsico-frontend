import './listagemDocumentos.css';
import Documento from "../../../assets/Documento.svg";

interface DocumentosProps {
    titulo: string;
    onClick?: ()=> void;
}

export default function ListagemDocumentos({ titulo, onClick }: DocumentosProps) {
    return (
        <div className="prontuarioContainer">
            <h1>Documentos</h1>
            <div className="prontuarioCard">
                <div className="prontuarioCardHeader">
                    <img src={Documento} alt="" />

                    <div className="prontuarioIcone" />
                    <strong className="prontuarioTitulo">{titulo}</strong>
                </div>

                <button
                    className="prontuarioBotaoAbrir"
                    onClick={onClick}
                >
                    Abrir Prontuário
                </button>
            </div>
        </div>
    );
}