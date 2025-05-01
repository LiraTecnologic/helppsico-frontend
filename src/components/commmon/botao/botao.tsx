import './botao.css';

interface BotaoProps {
    texto: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Botao (props: BotaoProps){
    return(
        <>
            <button type='submit' className='botao' onClick={props.onClick}>{props.texto}</button>
        </>
    );
}

export default Botao;