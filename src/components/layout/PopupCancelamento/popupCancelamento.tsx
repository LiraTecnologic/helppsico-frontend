import './popupCancelamento.css';

interface Props {
  fechar: () => void;
  onConfirm: () => void; // Adicionar a propriedade onConfirm
}

export default function PopupCancelamento({ fechar, onConfirm }: Props) { // Destruturar onConfirm
  return (
    <div className="overlay">
      <div className="popup">
        <h1>Deseja realmente cancelar a solicitação?</h1>
        <button className='aceitar' onClick={onConfirm}>Sim</button> 
        <button className='recusar' onClick={fechar}>Não</button>
      </div>
    </div>
  );
}