import "./InputLeitura.css";

interface InputLeituraProps{
    titulo: string,
    value: string,
    isContent: boolean
}

export default function InputLeitura(props: InputLeituraProps){
    return(
        <>
            <h2 className="tituloDoInput">{props.titulo}</h2>
            {props.isContent ? (
                <p>{props.value}</p>
            ) : (<input className="conteudoDoInput" type="text" value={props.value} readOnly/> )}
        </>
    ) 
}