import './dadosConsulta.css'

interface CardDadosConsultaProps {
    selecionado: number,
    valor: number,
    valorTotal: number
}

export default function DadosConsultaPsicologo(props: CardDadosConsultaProps) {
    return (
        <div className="calculo-consulta">
            <div className="total-selecionado">
                <span>Total Selecionado:</span>
                <span>{props.selecionado}</span>
            </div>
            <div className="valor-consulta">
                <span>Valor por consulta:</span>
                <span>R$ {props.valor}</span>
            </div>
            <hr className="linha-divisoria" />
            <div className="valor-total">
                <span>Valor Total:</span>
                <span>R$ {props.valorTotal}</span>
            </div>
        </div>
    );
}