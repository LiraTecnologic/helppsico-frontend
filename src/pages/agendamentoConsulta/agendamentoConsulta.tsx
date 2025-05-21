import "./agendamentoConsulta.css"
import Header from "../../components/layout/header/header"
import TabelaHorario from "../../components/layout/tabela/tabelaHorario";

export default function AgendamentoConsulta(){

    

    return(
        <>
            <Header fluxo="" headerPsicologo={false} />
            <main>
                <h1>Consulta</h1>
                <div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
                <div>
                    <h2>Dias de Atendimento</h2>
                    <TabelaHorario/>
                </div>
                <div>
                    <button>Agendar</button>
                </div>
            </main>
        </>
    );
}