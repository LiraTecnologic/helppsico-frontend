import "./InputLeitura.css";

interface InputLeituraProps {
  titulo: string;
  value: string;
  isContent: boolean;
}

export default function InputLeitura({
  titulo,
  value,
  isContent,
}: InputLeituraProps) {
  return (
    <>
      <h2 className="tituloDoInput">{titulo}</h2>
      {isContent ? (
        <p>{value}</p>
      ) : (
        <input className="conteudoDoInput" type="text" value={value} readOnly />
      )}
    </>
  );
}