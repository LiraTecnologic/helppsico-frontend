import "./agendamentoConsulta.css"
import Header from "../../components/layout/header/header"
import TabelaHorario from "../../components/layout/tabela/tabelaHorario";
import CardPsicologoConsulta from "../../components/layout/Cards/cardPsicologoConsulta/cardPsicologoConsulta";
import FotoPsicoloco from "../../assets/Foto.png"
import DadosConsultaPsicologo from "../../components/layout/Cards/dadosConsulta/dadosConsulta";

export default function AgendamentoConsulta(){

    const dadosPsicologo = {
        urlFoto: FotoPsicoloco,
        nome: "Dra. Mariana Silva",
        biografia: "Psicóloga clínica especializada em terapia cognitivo-comportamental com mais de 5 anos de experiência.",
        tempoSessao: "50 minutos"
    };  

    const dadosConsultaPsicologo = {
        selecionado: 2,
        valor: 100,
        valorTotal: 200
    }

    return(
        <>
            <Header fluxo="" headerPsicologo={false} />
            <main>
                <h1>Consulta</h1>
                <div className="container-psicologo">
                    <div className="dados-psicologo-consulta">
                        <CardPsicologoConsulta 
                            urlFoto={dadosPsicologo.urlFoto}
                            nome={dadosPsicologo.nome}
                            biografia={dadosPsicologo.biografia}
                            tempoSessao={dadosPsicologo.tempoSessao}
                        />
                    </div>
                    <div>
                        <DadosConsultaPsicologo
                            selecionado={dadosConsultaPsicologo.selecionado}
                            valor={dadosConsultaPsicologo.valor}
                            valorTotal={dadosConsultaPsicologo.valorTotal}
                        />
                    </div>
                </div>

                <h2>Dias de Atendimento</h2>
                <div>    
                    <TabelaHorario/>
                </div>
                
                <div className="container-botao-contulta">
                    <button className="botao-agendar-consulta">Agendar</button>
                </div>
            </main>
        </>
    );
}