import React, { useState } from "react";
import "./modalAvaliacaoPsicologo.css";
import { cadastrarAvaliacao } from './modalAvaliacaoPsicologo.service';
import { AvaliacaoModel } from "../../../models/avaliacoes";
import PacienteModel from "../../../models/paciente";
import EnderecoModel from "../../../models/endereco";
import PsicologoModel from "../../../models/psicologo";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  psicologo: PsicologoModel;
  onSubmitAvaliacao?: (rating: number, comment: string) => void;
}

export default function ModalAvaliacaoPsicologo({
  isOpen,
  onClose,
  psicologo,
  onSubmitAvaliacao,
}: ModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex: number) => {
    setHoverRating(starIndex);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = () => {
    if (onSubmitAvaliacao) {
      onSubmitAvaliacao(rating, comment);
    }

    // const idPaciente = localStorage.getItem('id-paciente');
    const idPaciente = '4a0dd9db-3b2a-4c08-8ab3-2af4f6854650';
    const idPsicologo = '0873d229-fd10-488a-b7e9-f294aa10e5db';

    let novaAvaliacao: AvaliacaoModel = {} as AvaliacaoModel;

    if (idPaciente) {
      const paciente: PacienteModel = {
        id: idPaciente,
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        genero: 'MASCULINO',
        fotoUrl: '',
        endereco: {} as EnderecoModel
      }


      const psicologoAvaliacao: PsicologoModel = {
        id: idPsicologo,
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        genero: 'MASCULINO',
        fotoUrl: '',
        crp: '',
        enderecoAtendimento: {} as EnderecoModel,
        biografia: '',
        status: '',
        valorSessao: 0,
        tempoSessao: 0
      }

      novaAvaliacao = {
        id: "",
        psicologo: psicologoAvaliacao,
        paciente: paciente,
        nota: rating,
        comentario: comment,
        data: ''
      };
    }


    if(novaAvaliacao) {
      cadastrarAvaliacao(novaAvaliacao);
    }

    setRating(0);
    setComment("");
    onClose();

  };

  const handleCancel = () => {
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <div className="modal-overlay-avaliacao">
      <div className="modal-content-avaliacao">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">Avaliar Psicólogo</h2>
        <div className="psicologo-info">
          <div className="psicologo-avatar">
            <img src={psicologo.fotoUrl} />
          </div>
          <span className="psicologo-nome">{psicologo?.nome}</span>
        </div>
        <div className="rating-section">
          <div className="stars-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star ${star <= (hoverRating || rating) ? "filled" : "empty"
                  }`}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="comment-section">
          <label className="comment-label">Comentário:</label>
          <textarea
            className="comment-input"
            placeholder="Digite um seu comentário..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
        </div>
        <div className="button-section">
          <button className="cancel-button" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="submit-button" onClick={handleSubmit}>
            Comentar
          </button>
        </div>
      </div>
    </div>
  );
}
