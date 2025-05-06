interface CardAvaliacaoProps {
    nota: String;
    quantidadeAvaliacao: String;
};

export default function CardAvaliacao(props: CardAvaliacaoProps) {
    return(
        <div>
            <p>{props.nota}</p>
            <div>
                <div>
                    <img src="../../" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    );
}