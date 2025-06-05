import "./listagemDocumentos.css";
import Documento from "../../../../assets/Documento.svg";
import DocumentoModel from "../../../../models/documento/documento";


interface ListagemDocumentosProps {
  documentos: DocumentoModel[];
  onDocumentoClick?: (id: string) => void;
}

export default function ListagemDocumentos({
  documentos,
  onDocumentoClick,
}: ListagemDocumentosProps) {
  return (
    <div className="documentosLayout">
      {documentos.map((documento) => (
        <div className="prontuarioContainer" key={documento.id}>
          <div className="prontuarioCard">
            <div className="prontuarioCardHeader">
              <img className="prontuarioImage" src={Documento} alt="" />
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