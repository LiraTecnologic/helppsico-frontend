import React from 'react';
import './cardSolicitacaoPsicologo.css';
import foto from '../../../../assets/imagemPaciente.jpg';

interface CardSolicitacaoPsicologoProps {
  nome: string;
  idade: number;
  cpf: string;
  telefone: string;
  status: string;
  botao: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSecondaryAction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function CardSolicitacaoVinculo(props: CardSolicitacaoPsicologoProps) {
  const { nome, idade, cpf, telefone, status, botao, onClick, onSecondaryAction } = props;

  const getStatusClass = () => {
    if (status === 'Pendente') return 'card-solicitacao-psicologo__status card-solicitacao-psicologo__status--pendente';
    if (status === 'Aceito') return 'card-solicitacao-psicologo__status card-solicitacao-psicologo__status--aceito';
    return 'card-solicitacao-psicologo__status card-solicitacao-psicologo__status--recusado';
  };

  const getBotaoClass = () => {
    if (status === 'Pendente') return 'card-solicitacao-psicologo__botao card-solicitacao-psicologo__botao--aceitar';
    return 'card-solicitacao-psicologo__botao card-solicitacao-psicologo__botao--ver-mais';
  };

  const getBotaoSecundarioClass = () => {
    return 'card-solicitacao-psicologo__botao card-solicitacao-psicologo__botao--recusar';
  };

  return (
    <div className="card-solicitacao-psicologo">
      <div className="card-solicitacao-psicologo__content">
        <img className="card-solicitacao-psicologo__foto" src={foto} alt="Foto do Paciente" />
        
        <div className="card-solicitacao-psicologo__info">
          <h2 className="card-solicitacao-psicologo__nome">{nome}</h2>
          <p className="card-solicitacao-psicologo__idade">{idade} anos</p>
          <p className="card-solicitacao-psicologo__cpf">CPF: {cpf}</p>
          <p className="card-solicitacao-psicologo__telefone">Telefone: {telefone}</p>
        </div>

        <div className="card-solicitacao-psicologo__acoes">
          <span className={getStatusClass()}>{status}</span>
          <div className="card-solicitacao-psicologo__botoes">
            <button className={getBotaoClass()} onClick={onClick}>
              {botao}
            </button>
            {status === 'Pendente' && onSecondaryAction && (
              <button className={getBotaoSecundarioClass()} onClick={onSecondaryAction}>
                Recusar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}