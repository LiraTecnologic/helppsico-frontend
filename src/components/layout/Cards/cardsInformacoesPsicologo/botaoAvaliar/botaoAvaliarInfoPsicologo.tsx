import { useState } from "react";
import SetaDireita from "../../../../../assets/right-seta.png";
import SetaEsquerda from "../../../../../assets/left-seta.png";
import ModalAvaliacaoPsicologo from "../../../modalAvaliacaoPsicologo/modalAvaliacaoPsicologo";

import "./botaoAvaliarInfoPsicologo.css";
import PsicologoModel from "../../../../../models/psicologo";
import { EstadoVinculo } from "../../../../../models/enum.vinculo";

interface BotaoAvaliarProps {
  psicologo: PsicologoModel;
  onAvaliacaoSubmit?: (rating: number, comment: string) => void;
  origem: boolean;
  estadoVinculo: EstadoVinculo;
}

export default function BotaoAvaliarInfoPsicologo({
  psicologo,
  onAvaliacaoSubmit,
  origem,
  estadoVinculo
}: BotaoAvaliarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const abrirModal = () => {
    if (!origem && estadoVinculo === EstadoVinculo.VINCULADO){
      setIsModalOpen(true);
    } 
  };
  const fecharModal = () => setIsModalOpen(false);

  const handleAvaliacaoSubmit = (rating: number, comment: string) => {
    if (onAvaliacaoSubmit) {
      onAvaliacaoSubmit(rating, comment);
    }
    fecharModal();
  };

  return (
    <>
      <div
        className="botao-avaliar-card-avaliacao"
        onClick={abrirModal}
        style={{ cursor: origem ? "pointer" : "default" }}
      >
        {!origem && estadoVinculo === EstadoVinculo.VINCULADO ? (
          <>
            <p className="titulo-botao">
              Quero avaliar <br /> meu psicólogo!
            </p>
            <div className="div-avlie-ja">
              <img src={SetaDireita} alt="Seta direita" />
              <p className="text-avalia">Avalie já</p>
              <img src={SetaEsquerda} alt="Seta esquerda" />
            </div>
          </>
        ) : (
          <>
            <p className="titulo-botao">
              Vincule para <br /> poder avaliar!
            </p>
            <div className="div-avlie-ja"></div>
          </>
        )}
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