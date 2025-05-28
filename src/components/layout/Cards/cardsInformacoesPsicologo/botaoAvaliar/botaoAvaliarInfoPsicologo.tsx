import { useState } from 'react';
import SetaDireita from "../../../../../assets/right-seta.png";
import SetaEsquerda from "../../../../../assets/left-seta.png";
import ModalAvaliacaoPsicologo from '../../../modalAvaliacaoPsicologo/modalAvaliacaoPsicologo';

import './botaoAvaliarInfoPsicologo.css';

export default function BotaoAvaliarInfoPsicologo() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const abrirModal = () => setIsModalOpen(true);
    const fecharModal = () => setIsModalOpen(false);

    return (
        <>
            <div
                className='botao-avaliar-card-avaliacao'
                onClick={abrirModal}
                style={{ cursor: 'pointer' }}
            >
                <p className='titulo-botao'>Quero avaliar <br /> meu psicólogo!</p>
                <div className='div-avlie-ja'>
                    <img src={SetaDireita} alt="Seta direita" />
                    <p className='text-avalia'>Avalie já</p>
                    <img src={SetaEsquerda} alt="Seta esquerda" />
                </div>
            </div>

            <ModalAvaliacaoPsicologo isOpen={isModalOpen} onClose={fecharModal} />
        </>
    );
}