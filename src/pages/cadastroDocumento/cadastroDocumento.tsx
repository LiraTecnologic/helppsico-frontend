import './cadastroDocumento.css';
import Header from '../../components/layout/header/header';
import DocumentoForm from '../../components/documentoForm/DocumentoForm';
import { useEffect, useState } from 'react';
import PacienteModel from '../../models/paciente';
import DadosGeraisDocumentoModel from '../../models/dadosGeraisDocumento';
import { cadastrarDocumento } from '../../services/documento.service';

export default function CadastroDocumento() {
    const [Paciente, setPaciente] = useState<PacienteModel[]>([]);
    const [tipoDocumento, setTipoDocumento] = useState(String);

    const idSolicitacao = "789e4567-e89b-12d3-a456-426614174000"; // mock

    useEffect(() => {
        setTipoDocumento('ATESTADO');
    }, []);

    const handleSubmitDocumento = async (dados: DadosGeraisDocumentoModel) => {
        try {
            const response = await cadastrarDocumento(dados, idSolicitacao);
            if (response.erro) {
                alert("Erro ao cadastrar documento.");
            } else {
                alert("Documento cadastrado com sucesso!");
            }
        } catch (e) {
            console.error("Erro inesperado:", e);
            alert("Erro inesperado ao salvar documento.");
        }
    };

    if (!tipoDocumento) {
        return <div>Tipo de documento não informado!</div>;
    }

    const nomeDocumento = (tipoDocumento: string) => {
        switch (tipoDocumento) {
            case "ATESTADO": return "Atestado";
            case "DECLARACAO": return "Declaração";
            case "RELATORIO_PSICOLOGICO": return "Relatório Psicológico";
            case "LAUDO_PSICOLOGICO": return "Laudo Psicológico";
            case "PARECER_PSICOLOGICO": return "Parecer Psicológico";
            default: return "Documento";
        }
    };

    return (
        <>
            <Header fluxo='' headerPsicologo={true} />
            <div className="container-documento">
                <h1 className="cadDoc-Titulo">Cadastro de Documentos - {nomeDocumento(tipoDocumento)}</h1>
                <div className="cadDoc-Linha"></div>

                <DocumentoForm
                    tipoDocumento={tipoDocumento}
                    pacientes={Paciente}
                    onSubmit={handleSubmitDocumento}
                />
            </div>
        </>
    );
}