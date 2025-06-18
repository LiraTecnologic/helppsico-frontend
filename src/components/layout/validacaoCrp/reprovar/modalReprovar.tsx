import BotaoModal from "../../../commmon/botoes/botaoModal/botaoModal";
import { notificarSucesso } from "../../../../utils/notificacoes";
import { validarCrp } from "../../../../pages/validacaoCrp/validacaoCrp.service";
import "./modalReprovar.css";
import ValidacaoCrpModel from "../../../../models/validacaoCrp";
import { useState } from "react";

interface Props {
  onClose: () => void;
  idPsicologo: string | null;
  validacao: ValidacaoCrpModel;
  onValidado: (id: string) => void;
}

export default function ModalReprovar({
  onClose,
  idPsicologo,
  validacao,
  onValidado,
}: Props) {
  const [motivoReprova, setMotivoReprova] = useState<string>("");

  const confirmar = async () => {
    console.log("Reprovando o psicólogo com id:", idPsicologo);
    onClose();
    notificarSucesso("Reprovado");
    validacao.motivoReprova = motivoReprova;
    await validarCrp(validacao.id, validacao);
    onValidado(validacao.id);
  };

  return (
    <div className="modal-aprovar">
      <div className="div-motivo-reprova">
        <h2>Qual motivo da reprova ?</h2>
        <textarea
          placeholder="Digite seu motivo..."
          name=""
          id=""
          cols={30}
          rows={10}
          value={motivoReprova}
          onChange={(e) => setMotivoReprova(e.target.value)}
        ></textarea>
      </div>
      <div className="div-botoes">
        <BotaoModal texto="Cancelar" tipo="CANCEL" onClick={onClose} />
        <BotaoModal texto="Confirmar" tipo="CONFIM" onClick={confirmar} />
      </div>
    </div>
  );
}