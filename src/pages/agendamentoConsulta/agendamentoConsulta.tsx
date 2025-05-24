import "./agendamentoConsulta.css"
import Header from "../../components/layout/header/header"
import CardPsicologoConsulta from "../../components/layout/Cards/cardPsicologoConsulta/cardPsicologoConsulta";
import FotoPsicoloco from "../../assets/Foto.png"
import DadosConsultaPsicologo from "../../components/layout/Cards/dadosConsulta/dadosConsulta";
import TabelaHorarios from "../../components/layout/configurarHorario/tabelaHorarios";

export default function AgendamentoConsulta(){

    const dadosPsicologo = {
        urlFoto: FotoPsicoloco,
        nome: "Dra. Mariana Silva",
        biografia: "Psicóloga clínica especializada em terapia cognitivo-comportamental com mais de 5 anos de experiência.",
        tempoSessao: 50,
        valor: 100,
        diasSelecionados: ["SEG", "TER", "QUA", "QUI", "SEX"],
        inicio: "08:00",
        fim: "18:00",
        intervalo: 10
    };  

    const dadosConsultaPsicologo = {
        selecionado: 7
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
                            valor={dadosPsicologo.valor}
                            valorTotal={dadosConsultaPsicologo.selecionado * dadosPsicologo.valor}
                        />
                    </div>
                </div>

                <h2>Dias de Atendimento</h2>
                <div className="container-gerenciamento">
                    <TabelaHorarios
                        dias={dadosPsicologo.diasSelecionados}
                        inicio={dadosPsicologo.inicio}
                        fim={dadosPsicologo.fim}
                        duracao={dadosPsicologo.tempoSessao}
                        intervalo={dadosPsicologo.intervalo}
                        agendamento={true}
                    />
                </div>
                
                <div className="container-botao-contulta">
                    <button className="botao-agendar-consulta">Agendar</button>
                </div>
            </main>
        </>
    );
}