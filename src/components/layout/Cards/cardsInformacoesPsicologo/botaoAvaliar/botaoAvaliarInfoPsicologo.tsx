import { Link } from "react-router-dom";
import { useState } from 'react';
import SetaDireita from "../../../../../assets/right-seta.png";
import SetaEsquerda from "../../../../../assets/left-seta.png";
import ModalAvaliacaoPsicologo from '../../../modalAvaliacaoPsicologo/modalAvaliacaoPsicologo';

import "./botaoAvaliarInfoPsicologo.css";

interface BotaoAvaliarProps {
    psicologo: {
        id: string;
        nome: string;
        foto: string;
    };
    onAvaliacaoSubmit?: (rating: number, comment: string) => void;
}

export default function BotaoAvaliarInfoPsicologo({ 
    psicologo,
    onAvaliacaoSubmit 
}: BotaoAvaliarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const abrirModal = () => setIsModalOpen(true);
    const fecharModal = () => setIsModalOpen(false);

    const handleAvaliacaoSubmit = (rating: number, comment: string) => {
        if (onAvaliacaoSubmit) {
            onAvaliacaoSubmit(rating, comment);
        }
    };

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

            <ModalAvaliacaoPsicologo 
                isOpen={isModalOpen} 
                onClose={fecharModal}
                psicologo={psicologo}
                onSubmitAvaliacao={handleAvaliacaoSubmit}
            />
        </>
    );
}