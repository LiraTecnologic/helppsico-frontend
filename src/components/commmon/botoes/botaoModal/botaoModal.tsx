interface PropsBotalModal  {
    texto: string,
    tipo: string
}

export default function BotaoModal(props: PropsBotalModal) {
    const acao =  () => {
        if(props.tipo === 'CANCEL') {

        } else {
            
        }

    }
    
    return (
        <>
            <button onClick={acao}>{props.texto}</button>
        </>
    );
}