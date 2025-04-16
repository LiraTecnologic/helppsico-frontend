import './etapasCadastro.css';

interface EtapasCadastroProps {
  etapaAtual: number;
}

export default function StepIndicator({ etapaAtual }: EtapasCadastroProps) {
    return (
        <div className="step-indicator">
          <div className={`circle ${etapaAtual === 1 ? 'active' : ''}`}>1</div>
          <div className="line"></div>
          <div className={`circle ${etapaAtual === 2 ? 'active' : ''}`}>2</div>
        </div>
      );
};
