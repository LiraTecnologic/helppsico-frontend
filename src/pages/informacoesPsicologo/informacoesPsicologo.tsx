import Header from "../../components/layout/header/header";
import Estrela from "../../assets/estrela.svg"
import FotoPsicologo from "../../assets/Foto.png"
import Localizacao from "../../assets/localização.svg"
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
        id: "",
        psicologo: {
            id: ""
        }, 
        paciente: {
            id: ""
        },
        nota: 0.0,
        comentario: "",
    },
    {
        id: "",
        psicologo: {
            id: ""
        }, 
        paciente: {
            id: ""
        },
        nota: 0.0,
        comentario: "",
    },
    {
        id: "",
        psicologo: {
            id: ""
        }, 
        paciente: {
            id: ""
        },
        nota: 0.0,
        comentario: "",
    }       
]

//Chamar metodo no service
const mediaNotaAvaliacao = 4.6;

const quantidadeVinculados = 12;

export default function InformacoesPsicologo() {
    

    return (
        <>
            <Header fluxo=""/>
            <main>
                <section className="section-psico-bio">
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
                        <hr/>
                        <div>
                            <p>Local  de atendimento:</p>
                            <p><img src={Localizacao} alt="Icon localização" />{psicologo.enderecoAtendimento.rua}, {psicologo.enderecoAtendimento.numero}.</p>
                        </div>
                    </div>
                    <div className="div-bio-psico">
                        <h2>Biografia</h2>
                        <p>{psicologo.biografia}</p>
                    </div>
                </section>
                <section></section>
                <section></section>
            </main>
        </>
    );

}