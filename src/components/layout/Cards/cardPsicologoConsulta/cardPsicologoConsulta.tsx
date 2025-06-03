import './cardPsicologoConsulta.css';

interface CardPsicologoConsultaProps {
  urlFoto: string;
  nome: string;
  biografia: string;
  tempoSessao: number;
}

export default function CardPsicologoConsulta(props: CardPsicologoConsultaProps) {
    return (
        <div className="cards-psicologo-consulta">
            <img
                src={props.urlFoto}
                alt={`Foto de ${props.nome}`}
                className="foto-psicologo"
            />
            <div className="info-psicologo-consulta">
                <h2>{props.nome}</h2>
                <p className="biografia">{props.biografia}</p>
                <div>
                    <span className='label'>Tempo de sessão: </span>
                    <span className='tempo'>{props.tempoSessao} minutos</span>
                </div>
            </div>
        </div>
    );
}