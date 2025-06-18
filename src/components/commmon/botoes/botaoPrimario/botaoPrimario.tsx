import "./botaoPrimario.css";

interface BotaoPrimarioProps {
  texto: string;
  onClick?: () => void;
}

export default function BotaoPrimario({ texto, onClick }: BotaoPrimarioProps) {
  return (
    <button className="botaoPrimario" onClick={onClick}>
      {texto}
    </button>
  );
}