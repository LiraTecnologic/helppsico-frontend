import './meuPainel.css';
import Header from '../../components/layout/header/header';
import VinculoPsicologo from '../../components/layout/Cards/vinculoPsicologo';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao';
import ListagemDocumentos  from '../../components/layout/Cards/listagemDocumentos';

export default function MeuPainelPaciente (){
    return(
        <>
            <div className="fundo">
                <Header fluxo='meuPainel' />
                <VinculoPsicologo nome='João Victor' email='joao@teste.com' fotoUrl='https://f.i.uol.com.br/fotografia/2023/12/19/17030128826581ea125661a_1703012882_3x4_md.jpg' />
                <ProximasSessoes sessaoMarcada={true} nomePsicologo='João Victor' idade='19 anos' telefone='(44) 9 9718-9920' local='Rua Natividade Regina Brianezi 547' data='26/04/2025' horario='08:45' valor='R$ 120,00' urlFoto='https://f.i.uol.com.br/fotografia/2023/12/19/17030128826581ea125661a_1703012882_3x4_md.jpg' statusPagamento='Pago' />
                <ListagemDocumentos titulo='Documento bonito' />
            </div>

        </>
    );
}