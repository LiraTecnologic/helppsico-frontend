import "./botaoModal.css";

interface PropsBotalModal {
  texto: string;
  tipo: string;
  onClick: () => void;
}

export default function BotaoModal({ texto, tipo, onClick }: PropsBotalModal) {
  const classe = tipo === "CANCEL" ? "botao-cancel" : "botao-confirm";

  return (
    <>
      <button className={classe} onClick={onClick}>
        {texto}
      </button>
    </>
  );
}