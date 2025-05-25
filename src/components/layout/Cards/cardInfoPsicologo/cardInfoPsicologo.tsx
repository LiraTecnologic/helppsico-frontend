import './cardInfoPsicologo.css';

interface CardInfoPsicologoProps {
    nome: string,
    crp: string,
    urlFoto: string
};

export default function CardInfoPsicologo(props: CardInfoPsicologoProps) {
    return (
        <div className="div-card-info-psico">
            <img src={props.urlFoto} alt="Imagem psicólogo" />
            <div>
                <h2>{props.nome}</h2>
                <p>CRP: {props.crp}</p>
            </div>
        </div>
    );
}