import "./listagemDocumentos.css";
import Documento from "../../../../assets/Documento.svg";
import DocumentoModel from "../../../../models/documento/documento";
import ProntuarioModel from "../../../../models/prontuario";


interface ListagemDocumentosProps {
  documentos: DocumentoModel[];
  prontuarios: ProntuarioModel[];
  onDocumentoClick?: (id: string) => void;
}

export default function ListagemDocumentos({
  documentos,
  prontuarios,
  onDocumentoClick,
}: ListagemDocumentosProps) {
  return (
    <div className="documentosLayout">
      {documentos.length > 0 && documentos.map((documento) => (
        <div className="prontuarioContainer" key={documento.id}>
          <div className="prontuarioCard">
            <div className="prontuarioCardHeader">
              <img className="prontuarioImage" src={Documento} alt="" />
              <div className="prontuarioIcone" />
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

      {prontuarios.length > 0 && prontuarios.map((documento) => (
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