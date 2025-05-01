import './popupCancelamento.css';

interface Props {
  fechar: () => void;
}

export default function PopupCancelamento({ fechar }: Props) {
  return (
    <div className="overlay">
      <div className="popup">
        <h1>Deseja realmente cancelar a solicitação?</h1>
        <button className='aceitar'>Sim</button>
        <button className='recusar' onClick={fechar}>Não</button>
      </div>
    </div>
  );
}