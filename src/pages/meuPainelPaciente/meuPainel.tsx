import './meuPainel.css';
import Header from '../../components/layout/header/header';
import VinculoPsicologo from '../../components/layout/Cards/vinculoPsicologo';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao';

export default function MeuPainelPaciente (){
    return(
        <>
            <div className="fundo">
                <Header fluxo='meuPainel' />
                <VinculoPsicologo nome='João Victor' email='joao@teste.com' fotoUrl='../../assets/imagemPaciente.jpg' />
                <ProximasSessoes sessaoMarcada={true} statusPagamento='Cancelado' />
            </div>

        </>
    );
}