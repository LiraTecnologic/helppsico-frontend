import React, { useState } from "react";
import "./modalAvaliacaoPsicologo.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  psicologo: {
    nome: string;
    foto: string;
  };
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
            <img src={psicologo.foto} />
          </div>
          <span className="psicologo-nome">{psicologo?.nome}</span>
        </div>
        <div className="rating-section">
          <div className="stars-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star ${
                  star <= (hoverRating || rating) ? "filled" : "empty"
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
