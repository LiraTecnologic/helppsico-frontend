import Header from "../../components/layout/header/header";
import Estrela from "../../assets/estrela.svg"
import FotoPsicologo from "../../assets/Foto.png"
import Localizacao from "../../assets/localização.svg"
import TabelaHorario from "../../components/layout/tabela/tabelaHorario"
import CardInfoAvaliacao from "../../components/layout/Cards/cardsInformacoesPsicologo/avaliacao/info/cardInfoAvaliacao"
import BotaoAvaliarInfoPsicologo from "../../components/layout/Cards/cardsInformacoesPsicologo/botaoAvaliar/botaoAvaliarInfoPsicologo"
import CardAvaliacao from "../../components/layout/Cards/cardsInformacoesPsicologo/avaliacao/cardAvaliacao"

import './informacoesPsicologo.css';

const psicologo = {
    id: "",
    nome: "Nome Psicologo Legal ",
    crp: "01000-000",
    cpf: "789456123-84",
    email: "emailteste@gmail.com",
    telefone: "(44) 659874-8956",
    dataNascimento: "03/04/1980",
    genero: "Masculino",
    enderecoAtendimento: {
        rua: "Rua teste",
        numero: "321",
        cep: "78945-96",
        cidade: "Cidade Teste",
        estado: "Estado Teste"
    },
    biografia: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit nunc vel eros faucibus maximus. Curabitur iaculis pharetra venenatis. Praesent eget venenatis nisl. Proin et porta erat, ac interdum velit. Ut facilisis erat sit amet malesuada pharetra. Nulla facilisi. Nam luctus mattis tincidunt. Donec nibh mi, interdum quis maximus maximus, ultricies ut orci. Vivamus volutpat ultricies sem, non mattis purus maximus quis. Nam in leo quis turpis malesuada condimentum. Nullam cursus sagittis ex et iaculis. Ut nulla neque, vestibulum ut velit quis, pellentesque porta dui. Duis convallis dolor in sem ullamcorper porttitor ac ut lectus. Aliquam erat volutpat. Integer vestibulum, purus vitae fermentum dapibus, dolor orci varius diam, at iaculis tortor erat eget libero. Cras et magna fermentum purus elementum aliquam sed sed est. Proin turpis purus, suscipit id augue cursus, venenatis sodales lorem. Maecenas sodales accumsan leo ultricies ultrices. Vivamus finibus euismod nunc eget vehicula. Aliquam at libero at arcu iaculis mattis eget ac ante. Maecenas lacinia condimentum ligula, sit amet pulvinar urna efficitur sed. Integer vitae urna a lectus varius iaculis non at lorem. Sed neque enim, ultricies vitae tincidunt nec, scelerisque eget metus. Etiam tincidunt libero est, ac vestibulum orci dictum a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc hendrerit, erat in ornare pharetra, orci nulla feugiat eros, non mattis sapien velit eget urna. Vestibulum non lobortis magna. In tincidunt ex vitae auctor congue. Vestibulum magna felis, vehicula id maximus at, aliquet at sem. Morbi blandit enim in leo tincidunt feugiat. Proin sit amet scelerisque nibh. Nullam lacinia elit sit amet metus interdum venenatis. Ut at metus eget arcu dignissim ornare. Nunc tincidunt eget mauris sed volutpat. Sed enim turpis, volutpat nec lectus at, dictum aliquam libero. Mauris venenatis est molestie, tincidunt urna vitae, aliquam urna. Curabitur sed feugiat nisi. Vestibulum metus."
}

const avaliacaos = [
    {
        id: "a1b2c3",
        psicologo: {
            id: "p001"
        },
        paciente: {
            id: "pac001",
            foto: "https://randomuser.me/api/portraits/men/32.jpg",
            nome: "Carlos Oliveira"
        },
        nota: 4.5,
        comentario: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo tellus, mollis ac interdum quis, aliquam lobortis risus. Ut viverra ac nunc vitae euismod. Sed molestie, purus sed efficitur mollis, arcu nibh semper massa, a malesuada eros felis morbi.",
        data: "2025-05-01"
    },
    {
        id: "d4e5f6",
        psicologo: {
            id: "p002"
        },
        paciente: {
            id: "pac002",
            foto: "https://randomuser.me/api/portraits/women/45.jpg",
            nome: "Juliana Souza"
        },
        nota: 5.0,
        comentario: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo tellus, mollis ac interdum quis, aliquam lobortis risus. Ut viverra ac nunc vitae euismod. Sed molestie, purus sed efficitur mollis, arcu nibh semper massa, a malesuada eros felis morbi.",
        data: "2025-04-25"
    },
    {
        id: "g7h8i9",
        psicologo: {
            id: "p001"
        },
        paciente: {
            id: "pac003",
            foto: "https://randomuser.me/api/portraits/men/21.jpg",
            nome: "Bruno Lima"
        },
        nota: 3.8,
        comentario: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo tellus, mollis ac interdum quis, aliquam lobortis risus. Ut viverra ac nunc vitae euismod. Sed molestie, purus sed efficitur mollis, arcu nibh semper massa, a malesuada eros felis morbi.",
        data: "2025-04-15"
    }
];


//Chamar metodo no service
const mediaNotaAvaliacao = 4.6;

const quantidadeVinculados = 12;

export default function InformacoesPsicologo() {


    return (
        <>
            <Header fluxo="" headerPsicologo={false} />
            <main className="main-info-psicologico">
                <div className="div-psicologo">
                    <img src={FotoPsicologo} alt="Foto psicólogo" />
                    <h1>{psicologo.nome} ({mediaNotaAvaliacao} <img src={Estrela} alt="Icon estrela" />)</h1>
                    <button>Vincular</button>
                    <div>
                        <p>{quantidadeVinculados} vinculados | {avaliacaos.length} avaliações</p>
                        <p>CRP {psicologo.crp}</p>
                        <p>{psicologo.email}</p>
                        <p>{psicologo.telefone}</p>
                    </div>
                    <hr />
                    <div>
                        <p>Local  de atendimento:</p>
                        <p><img src={Localizacao} alt="Icon localização" />{psicologo.enderecoAtendimento.rua}, {psicologo.enderecoAtendimento.numero}.</p>
                    </div>
                </div>
                <div className="div-direita">
                    <section className="section-psico-bio">

                        <div className="div-bio-psico">
                            <h2>Biografia</h2>
                            <p>{psicologo.biografia}</p>
                        </div>
                    </section>
                    <section className="section-tabela">
                        <h2>Horários de consulta:</h2>
                        <TabelaHorario />
                    </section>
                    <section className="section-avaliacao">
                        <h2>Avaliações e comentários:</h2>
                        <div className="cards-section-avaliacao">
                            <CardInfoAvaliacao
                                nota={4.5}
                                quantidadeAvaliacao="20"
                            />
                            <BotaoAvaliarInfoPsicologo />
                        </div>
                        <div className="listagem-avaliacao">
                            {avaliacaos.map((avaliacao, index) => (
                                <CardAvaliacao
                                    key={index}
                                    fotoPaciente={avaliacao.paciente.foto || ""}
                                    nomePaciente={avaliacao.paciente.nome}
                                    data={avaliacao.data}
                                    conteudo={avaliacao.comentario}
                                    nota={avaliacao.nota}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );

}