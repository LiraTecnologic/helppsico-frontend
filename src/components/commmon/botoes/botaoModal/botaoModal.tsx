import './botaoModal.css';

interface PropsBotalModal {
    texto: string;
    tipo: string;
    onClick: () => void;
}

export default function BotaoModal(props: PropsBotalModal) {

    const classe = props.tipo === 'CANCEL' ? 'botao-cancel' : 'botao-confirm';

    return (
        <>
            <button className={classe} onClick={props.onClick}>
                {props.texto}
            </button>
        </>
    );
}