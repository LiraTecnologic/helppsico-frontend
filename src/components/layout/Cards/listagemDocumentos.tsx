import './listagemDocumentos.css';
import Documento from "../../../assets/Documento.svg";

interface DocumentoProps {
    titulo: string;
    id: string;
}

interface ListagemDocumentosProps {
    documentos: DocumentoProps[];
    onDocumentoClick?: (id: string) => void;
}

export default function ListagemDocumentos({ documentos, onDocumentoClick }: ListagemDocumentosProps) {
    return (
        <div className="documentosLayout">
            {documentos.map((documento) => (
                <div className="prontuarioContainer" key={documento.id}>
                    <div className="prontuarioCard">
                        <div className="prontuarioCardHeader">
                            <img src={Documento} alt="" />
                            <div className="prontuarioIcone" />
                            <strong className="prontuarioTitulo">{documento.titulo}</strong>
                        </div>

                        <button
                            className="prontuarioBotaoAbrir"
                            onClick={() => onDocumentoClick && onDocumentoClick(documento.id)}
                        >
                            Abrir Prontuário
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}