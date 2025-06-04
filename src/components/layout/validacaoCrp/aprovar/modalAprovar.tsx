import BotaoModal from "../../../commmon/botoes/botaoModal/botaoModal";
import { notificarSucesso } from "../../../../utils/notificacoes";
import { validarCrp } from "../../../../pages/validacaoCrp/validacaoCrp.service";
import "./modalAprovar.css";
import ValidacaoCrpModel from "../../../../models/validacaoCrp";

interface Props {
  onClose: () => void;
  validacao: ValidacaoCrpModel;
  idPsicologo: string | null;
  onValidado: (id: string) => void;
}

export default function ModalAprovar({
  onClose,
  validacao,
  idPsicologo,
  onValidado,
}: Props) {
  const confirmar = async () => {
    console.log("Aprovando o psicólogo com id:", idPsicologo);
    onClose();
    notificarSucesso("Aprovado");
    await validarCrp(validacao.id, validacao);
    onValidado(validacao.id);
  };

  return (
    <div className="modal-aprovar">
      <div className="div-motivo-reprova">
        <h2>Deseja realmente aprovar ?</h2>
      </div>
      <div className="div-botoes">
        <BotaoModal texto="Não" tipo="CANCEL" onClick={onClose} />
        <BotaoModal texto="Sim" tipo="CONFIM" onClick={confirmar} />
      </div>
    </div>
  );
}