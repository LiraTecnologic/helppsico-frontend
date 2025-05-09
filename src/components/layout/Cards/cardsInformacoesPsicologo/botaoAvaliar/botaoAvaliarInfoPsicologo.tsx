import { Link } from 'react-router-dom';
import SetaDireita from "../../../../../assets/right-seta.png"
import SetaEsquerda from "../../../../../assets/left-seta.png"

import './botaoAvaliarInfoPsicologo.css';

export default function BotaoAvaliarInfoPsicologo() {
    return (
        <div className='botao-avaliar-card-avaliacao'>
            <Link
                to="/"
                className='link-sem-estilo'
            >
                <p className='titulo-botao'>Quero avaliar <br /> meu psicólogo!</p>
                <div className='div-avlie-ja'>
                    <img src={SetaDireita} alt="Seta direita" />
                    <p className='text-avalia'>Avalie já</p>
                    <img src={SetaEsquerda} alt="Seta esquerda" />
                </div>
            </Link>
        </div>
    );
}