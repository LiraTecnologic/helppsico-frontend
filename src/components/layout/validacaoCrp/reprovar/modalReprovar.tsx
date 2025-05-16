import BotaoModal from "../../../commmon/botoes/botaoModal/botaoModal";
import { notificarSucesso } from '../../../../utils/notificacoes';
import './modalReprovar.css';


interface Props {
    onClose: () => void,
    idPsicologo: string | null
    
}

export default function ModalReprovar(props: Props) {
    
    const confirmar = () => {
        console.log("Reprovando o psicólogo com id:", props.idPsicologo);
        props.onClose(); 
        notificarSucesso('Reprovado');  
    };
    
    return (
        <div className="modal-aprovar">
            <div className="div-motivo-reprova">
                <h2>Qual motivo da reprova ?</h2>
                <textarea name="" id="" cols={30} rows={10}></textarea>
            </div> 
            <div className="div-botoes">
                <BotaoModal texto="Cancelar" tipo='CANCEL' onClick={props.onClose}/>
                <BotaoModal texto="Confirmar" tipo='CONFIM' onClick={confirmar}/>
            </div>
        </div>
    );
}