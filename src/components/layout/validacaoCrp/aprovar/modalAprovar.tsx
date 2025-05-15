import BotaoModal from "../../../commmon/botoes/botaoModal/botaoModal";

export default function ModalAprovar() {
    return (
        <div className="modal-aprovar">
            <div>
                <h2>Qual motivo da reprova ?</h2>
                <textarea name="" id="" cols={30} rows={10}></textarea>
            </div> 
            <div>
                <BotaoModal texto="Cancelar" tipo="CANCEL"/>
                <BotaoModal texto="Confirmar" tipo="CONFIM"/>
            </div>
        </div>
    );
}