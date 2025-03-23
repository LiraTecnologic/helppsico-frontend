import './botao.css';

interface BotaoProps {
    texto: string;
}

function Botao (props: BotaoProps){
    return(
        <>
            <button type='submit' className='botao'>{props.texto}</button>
        </>
    );
}

export default Botao;