import './meuPainel.css';
import Header from '../../components/layout/header/header';
import VinculoPsicologo from '../../components/layout/Cards/vinculoPsicologo/vinculoPsicologo';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao/proximaSessao';
import ListagemDocumentos from '../../components/layout/Cards/listagemDeDocumentos/listagemDocumentos';
import { Link } from "react-router-dom";

export default function MeuPainelPaciente() {
    const documentos = [
        { id: '1', titulo: 'Documento bonito' },
        { id: '2', titulo: 'Relatório de Sessão' },
        { id: '3', titulo: 'Plano de Tratamento' },
        { id: '4', titulo: 'Andre feioso' },
        { id: '5', titulo: 'Andre feioso' }
    ];

    const handleDocumentoClick = (id: string) => {
        console.log(`Documento com ID ${id} foi clicado`);
    };

    return (
        <>
            <div className="fundo">
                <Header fluxo='meuPainel' headerPsicologo={false} />
                <VinculoPsicologo nome='João Victor' email='joao@teste.com' fotoUrl='https://f.i.uol.com.br/fotografia/2023/12/19/17030128826581ea125661a_1703012882_3x4_md.jpg' />
                <ProximasSessoes fluxo='paciente' sessaoMarcada={false} nome='João Victor' idade='19 anos' telefone='(44) 9 9718-9920' local='Rua Natividade Regina Brianezi 547' data='26/04/2025' horario='08:45' valor='R$ 120,00' urlFoto='https://f.i.uol.com.br/fotografia/2023/12/19/17030128826581ea125661a_1703012882_3x4_md.jpg' statusPagamento='Pago' verMais={true} />
                <div className="listagemDocumentos">
                    <h1 className='documentoTittle'>Prontuário</h1>
                    <button className="botaoVerMais">
                        <Link to="/paciente/solicitacao-documento" className="botao-link">Solicitar Documento</Link>
                    </button>
                </div>
                <ListagemDocumentos
                    documentos={documentos}
                    onDocumentoClick={handleDocumentoClick}
                />
            </div>
        </>
    );
}