import './meuPainelPsicologo.css';
import Header from '../../components/layout/header/header';
import ProximasSessoes from '../../components/layout/Cards/proximaSessao/proximaSessao';
import ListagemDocumentos from '../../components/layout/Cards/listagemDeDocumentos/listagemDocumentos';
import ListagemDePacientes from '../../components/layout/listagemDePacientes/listagemDePacientes';

export default function MeuPainelPsicologo(){
    const documentos = [
        { id: '1', titulo: 'Documento bonito' },
        { id: '2', titulo: 'Relatório de Sessão' },
        { id: '3', titulo: 'Plano de Tratamento' },
        { id: '4', titulo: 'Andre feioso' },
        { id: '5', titulo: 'Andre feioso' }
    ];

    const pacientes = [
        { fotoUrl: 'https://forbes.com.br/wp-content/uploads/2021/06/ForbesTech_Lucas-Carrilho-Pessoa-group-project-manager-do-iFood_Divulgacao.png', nome: 'João Victor' },
        { fotoUrl: 'https://forbes.com.br/wp-content/uploads/2021/06/ForbesTech_Lucas-Carrilho-Pessoa-group-project-manager-do-iFood_Divulgacao.png', nome: 'Maria Souza' },
        { fotoUrl: 'https://forbes.com.br/wp-content/uploads/2021/06/ForbesTech_Lucas-Carrilho-Pessoa-group-project-manager-do-iFood_Divulgacao.png', nome: 'Carlos Lima' }
      ];

    const handleDocumentoClick = (id: string) => {
        console.log(`Documento com ID ${id} foi clicado`);
        alert("clicou no documento");
    };

    return(
        <>
            <Header fluxo='meuPainel' />
            <ProximasSessoes sessaoMarcada={true} verMais={true} />
            <div className="imagensPacientes">
                <ListagemDePacientes pacientes={pacientes}/>
            </div>
            <h1 className='prontuarioTittle'>Prontuário</h1>
            <ListagemDocumentos 
                documentos={documentos} 
                onDocumentoClick={handleDocumentoClick} 
            />
        </>
    )
}