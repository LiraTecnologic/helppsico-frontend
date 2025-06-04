import "./popupCancelamento.css";

interface Props {
  fechar: () => void;
  onConfirm: () => void;
  titulo?: string;
}

export default function PopupCancelamento({ fechar, onConfirm, titulo = "Deseja realmente cancelar a solicitação?" }: Props) {
  return (
    <div className="overlay">
      <div className="popup">
        <h1>{titulo}</h1>
        <div className="botoes-Sim-Nao">
          <button className='aceitar' onClick={onConfirm}>Sim</button> 
          <button className='recusar' onClick={fechar}>Não</button>
        </div>
      </div>
    </div>
  );
}