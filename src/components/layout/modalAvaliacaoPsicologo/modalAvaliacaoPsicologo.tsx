import './modalAvaliacaoPsicologo.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalAvaliacaoPsicologo({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Avaliar seu Psicólogo</h2>
                {/* Foto e nome do psicologo */}
                {/* Estrelas */}
                <p>Comentário:</p>
                {/* input */}
                {/* botão cancelar e comentar */}
            </div>
        </div>
    );
}