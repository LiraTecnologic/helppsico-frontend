import './dadosConsulta.css'

interface CardDadosConsultaProps {
    selecionado: number,
    valor: number,
    valorTotal: number
}

export default function DadosConsultaPsicologo(props: CardDadosConsultaProps) {
    return (
        <div className="calculo-consulta">
            <p className="total-selecionado">
                <span>Total Selecionado: {props.selecionado}</span>
            </p>
            <p className="valor-consulta">
                <span>Valor por consulta: R$ {props.valor}</span>
            </p>
            <hr className="linha-divisoria" />
            <p className="valor-total">
                <span>Valor Total: R$ {props.valorTotal}</span>
            </p>
        </div>
    );
}