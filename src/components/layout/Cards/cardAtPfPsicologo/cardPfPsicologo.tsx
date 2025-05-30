import React from 'react';
import './cardPfPsicologo.css';
import PsicologoModel from '../../../../models/psicologo';

interface CardPfPsicologoProps {
    psicologo: PsicologoModel;
    valorSessao: string;
    biografia: string;
    onValorSessaoChange: (valor: string) => void;
    onBiografiaChange: (biografia: string) => void;
    onEditar: () => void;
    onVoltar: () => void;
    botaoTexto: string;
}

const CardPfPsicologo: React.FC<CardPfPsicologoProps> = ({
    psicologo,
    valorSessao,
    biografia,
    onValorSessaoChange,
    onBiografiaChange,
    onEditar,
    onVoltar,
    botaoTexto
}) => {
    return (
        <div className="card-pf-psicologo">
            <div className="card-pf-psicologo-valor-section">
                <h2>Valor de Sessão</h2>
                <input
                    type="text"
                    className="card-pf-psicologo-valor-input"
                    placeholder="Digite o valor da sessão..."
                    value={valorSessao}
                    onChange={(e) => onValorSessaoChange(e.target.value)}
                />
            </div>

            <div className="card-pf-psicologo-biografia-section">
                <h2>Biografia</h2>
                <textarea
                    className="card-pf-psicologo-biografia-textarea"
                    placeholder="Nos conte um pouco mais sobre sua história..."
                    value={biografia}
                    onChange={(e) => onBiografiaChange(e.target.value)}
                />
            </div>

            <div className="card-pf-psicologo-actions">
                <button className="card-pf-psicologo-btn-editar" onClick={onEditar}>
                    {botaoTexto}
                </button>
                <button className="card-pf-psicologo-btn-voltar" onClick={onVoltar}>
                    Voltar
                </button>
            </div>
        </div>
    );
};

export default CardPfPsicologo;