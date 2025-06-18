import "./botao.css";

interface BotaoProps {
  texto: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Botao({ texto, onClick }: BotaoProps) {
  return (
    <>
      <button type="submit" className="botao" onClick={onClick}>
        {texto}
      </button>
    </>
  );
}