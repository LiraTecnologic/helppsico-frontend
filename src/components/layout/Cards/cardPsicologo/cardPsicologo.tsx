import "./cardPsicologo.css";

interface CardPsicologoProps {
  urlFoto: string;
  nome: string;
  idade: number;
  crp: string;
  mediaAvaliacoes: number;
  quantidadeAvaliacoes: number;
  biografia: string;
}

interface CardPsicolog {
  profissionais: CardPsicologoProps[];
}

export default function CardPsicologo({ profissionais }: CardPsicolog) {
  return (
    <div className="cards-container">
      {profissionais.map((psicologo, index) => (
        <div key={index} className="card-psicologo">
          <img
            src={psicologo.urlFoto}
            alt={`Foto de ${psicologo.nome}`}
            className="foto-psicologo"
          />
          <div className="info-psicologo">
            <h2>{psicologo.nome}</h2>
            <p className="dados-gerais">
              {psicologo.idade} anos | CRP: {psicologo.crp} |{" "}
              <span className="avaliacao">
                {psicologo.mediaAvaliacoes.toFixed(1)} ⭐
              </span>{" "}
              ({psicologo.quantidadeAvaliacoes} avaliações)
            </p>
            <p className="biografia">{psicologo.biografia}</p>
            <button className="btn-ver-mais">Ver mais</button>
          </div>
        </div>
      ))}
    </div>
  );
}