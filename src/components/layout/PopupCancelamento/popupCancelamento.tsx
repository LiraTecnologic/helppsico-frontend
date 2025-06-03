import "./popupCancelamento.css";

interface Props {
  fechar: () => void;
  onConfirm: () => void;
}

export default function PopupCancelamento({ fechar, onConfirm }: Props) {
  return (
    <div className="overlay">
      <div className="popup">
        <h1>Deseja realmente cancelar a solicitação?</h1>
        <div className="botoes">
          <button className="aceitar" onClick={onConfirm}>
            Sim
          </button>
          <button className="recusar" onClick={fechar}>
            Não
          </button>
        </div>
      </div>
    </div>
  );
}