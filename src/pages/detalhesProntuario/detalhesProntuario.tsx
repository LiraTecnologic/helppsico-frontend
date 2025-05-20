import "./detlhesProntuario.css";
import Header from "../../components/layout/header/header";

export default function DetalhesProntuario(){
    return (
        <>
            <Header fluxo="" headerPsicologo={true} />
            <main>
                <h1>Detalhes Do Prontuário</h1>
                <div className="info-linhas">
                    <div className="info-bloco">
                        <h2>Título</h2>
                        <input type="text" value="Sessão do dia 07/04/2025" readOnly />
                    </div>
                    <div className="info-bloco">
                        <h2>Paciente</h2>
                        <input type="text" value="João Victor Nascimento" readOnly />
                    </div>
                    <div className="info-bloco">
                        <h2>Consulta</h2>
                        <input type="text" value="Sessão #12 - 07/04/2025" readOnly />
                    </div>
                </div>
                    
                <div className="info-bloco">
                    <h2>Psicólogo Responsável</h2>
                    <input type="text" value="Dra. Maria Santos - CRP XX/XXXXX" readOnly />
                </div>

                <h2>Conteúdo</h2>
                <div className="conteudo-box">
                    <p>
                        O paciente compareceu à sessão relatando melhora significativa no quadro de ansiedade. Mencionou que as técnicas de respiração e mindfulness têm ajudado nos
                        momentos de maior estresse, especialmente no ambiente de trabalho. Durante a sessão, trabalhamos na identificação de pensamentos automáticos negativos e
                        suas origens. O paciente demonstrou boa capacidade de insight e conseguiu estabelecer conexões entre situações atuais e experiências passadas. Para a próxima
                        semana, foi recomendado que continuasse com os exercícios de respiração diariamente e começasse a registrar seus pensamentos em um diário, especialmente
                        quando sentir ansiedade. Próximos passos: aprofundar questões relacionadas à autoestima e reforçar estratégias de enfrentamento.
                    </p>
                </div>
            </main>
        </>
    )
}