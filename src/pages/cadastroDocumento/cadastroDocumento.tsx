import './cadastroDocumento.css';
import Header from '../../components/layout/header/header';
import DocumentoForm from '../../components/documentoForm/DocumentoForm';
import { useEffect, useState } from 'react';
import PacienteModel from '../../models/paciente';
import DadosGeraisDocumentoModel from '../../models/dadosGeraisDocumento';
import { cadastrarDocumento } from '../../services/documento.service';
import { notificarErro, notificarSucesso } from '../../utils/notificacoes';
import { useLocation } from 'react-router';

export default function CadastroDocumento() {
    const [Paciente, setPaciente] = useState<PacienteModel[]>([]);
    const [tipoDocumento, setTipoDocumento] = useState(String);
    const location = useLocation();

    const idSolicitacao = "c6412cc5-7461-48e2-9489-aadb0a23d838";

    useEffect(() => {
        setTipoDocumento(location.state.tipoDocumento);
    }, []);

    const handleSubmitDocumento = async (dados: DadosGeraisDocumentoModel) => {
        try {
            const response = await cadastrarDocumento(dados, idSolicitacao);
            if (response.erro) {
                notificarErro("Erro ao cadastrar documento.");
            } else {
                notificarSucesso("Documento cadastrado");
            }
        } catch (e) {
            console.error("Erro inesperado:", e);
            notificarErro("Erro inesperado ao salvar documento.");
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