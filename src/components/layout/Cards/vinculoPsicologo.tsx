import './vinculoPsicologo.css';

interface VinculoPsicologoProps {
  nome: string;
  email: string;
  fotoUrl: string;
}

export default function VinculoPsicologo({ nome, email, fotoUrl }: VinculoPsicologoProps) {
  return (
    <div className="cartao-psicologo">
      <h3 className="cartao-psicologo__titulo">Vinculado com:</h3>
      <div className="cartao-psicologo__conteudo">
        <img className="cartao-psicologo__imagem" src={fotoUrl} alt={`Foto de ${nome}`} />
        <p className="cartao-psicologo__nome">{nome}</p>
        <p className="cartao-psicologo__email">{email}</p>
      </div>
    </div>
  );
}