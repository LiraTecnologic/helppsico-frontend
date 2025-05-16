import BotaoModal from "../../../commmon/botoes/botaoModal/botaoModal";
import { notificarSucesso } from '../../../../utils/notificacoes';
import './modalAprovar.css';


interface Props {
    onClose: () => void,
    idPsicologo: string | null
}

export default function ModalAprovar(props: Props) {
    
    const confirmar = () => {
        console.log("Aprovando o psicólogo com id:", props.idPsicologo);
        props.onClose(); 
        notificarSucesso('Aprovado');
    };
    
    return (
        <div className="modal-aprovar">
            <div className="div-motivo-reprova">
                <h2>Deseja realmente aprovar ?</h2>
            </div> 
            <div className="div-botoes">
                <BotaoModal texto="Não" tipo='CANCEL' onClick={props.onClose}/>
                <BotaoModal texto="Sim" tipo='CONFIM' onClick={confirmar}/>
            </div>
        </div>
    );
}