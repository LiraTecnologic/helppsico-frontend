import { Link } from "react-router-dom";
import VinculoModel from "../../../../models/vinculo";
import "./vinculoPsicologo.css";

interface VinculoPsicologoProps {
  vinculo?: VinculoModel
  onBuscarPsicologo?: () => void;
}

export default function VinculoPsicologo({
  vinculo,
  onBuscarPsicologo,
}: VinculoPsicologoProps) {

  if (vinculo) {
    return (
      <div className="cartao-psicologo">
        <h1 className="cartao-psicologo__titulo">Vinculado com</h1>
        <div className="cartao-psicologo__conteudo">
          <img
            className="cartao-psicologo__imagem"
            src={vinculo.psicologo.fotoUrl}
            alt={`Foto de ${vinculo.psicologo.nome}`}
          />
          <p className="cartao-psicologo__nome">{vinculo.psicologo.nome}</p>
          <p className="cartao-psicologo__email">{vinculo.psicologo.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cartao-psicologo">
      <h1 className="cartao-psicologo__titulo">Sem Vínculo</h1>
      <div className="cartao-psicologo__conteudo">
        <div className="cartao-psicologo__sem-vinculo">
          <div className="cartao-psicologo__icone">🧠</div>
          <p className="cartao-psicologo__mensagem">
            Cuidar da sua saúde mental é fundamental para o seu bem-estar.
          </p>
          <p className="cartao-psicologo__submensagem">
            Encontre um psicólogo que possa te ajudar em sua jornada.
          </p>
          <Link to={`/psicologos`} state={'paciente'}>
            <button
              className="cartao-psicologo__botao"
              onClick={onBuscarPsicologo}
            >
              Buscar Psicólogo
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}