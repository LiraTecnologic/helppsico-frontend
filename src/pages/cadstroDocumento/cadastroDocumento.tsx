import './cadastroDocumento.css';
import Header from '../../components/layout/header/header';
import DocumentoForm from '../../components/documentoForm/DocumentoForm';

export default function CadastroDocumento() {
    const tipoDocumento = "declaracao";

    const pacientes = [
        {
            id: '1',
            nome: 'João da Silva',
            dataNascimento: '1990-01-01',
            genero: 'Masculino',
            telefone: '11999999999',
            email: 'joao@example.com',
        },
        {
            id: '2',
            nome: 'Maria Souza',
            dataNascimento: '1985-05-15',
            genero: 'Feminino',
            telefone: '11988888888',
            email: 'maria@example.com',
        },
        {
            id: '3',
            nome: 'Carlos Oliveira',
            dataNascimento: '2000-07-20',
            genero: 'Masculino',
            telefone: '11977777777',
            email: 'carlos@example.com',
        },
    ];

    if (!tipoDocumento) {
        return <div>Tipo de documento não informado!</div>;
    }

    return (
        <>
            <Header fluxo='' headerPsicologo={true} />
            <div className="container-documento">
                <h1 className="cadDoc-Titulo">Cadastro de Documentos - {tipoDocumento}</h1>
                <div className="cadDoc-Linha"></div>

                <DocumentoForm
                    tipoDocumento={tipoDocumento}
                    pacientes={pacientes}
                />
            </div>
        </>
    );
}
