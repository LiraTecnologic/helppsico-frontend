import './cadastroDocumento.css';
import Header from '../../components/layout/header/header';
import DocumentoForm from '../../components/documentoForm/DocumentoForm';
import { useEffect, useState } from 'react';
import PacienteModel from '../../models/paciente';
import DadosGeraisDocumentoModel from '../../models/dadosGeraisDocumento';
import { cadastrarDocumento } from '../../services/documento.service';
import { notificarErro, notificarSucesso } from '../../utils/notificacoes';
import { useLocation } from 'react-router';
import { consultarVinculosPaciente } from '../../services/vinculos.service';
import PsicologoModel from '../../models/psicologo';

export default function CadastroDocumento() {
    const [paciente, setPaciente] = useState<PacienteModel | null>(null);
    const [psicologo, setPsicologo] = useState<PsicologoModel | null>(null);
    const [tipoDocumento, setTipoDocumento] = useState<string | ''>('');
    const [idSolicitacao, setIdSolicitacao] = useState<string | ''>('');
    const location = useLocation();

    useEffect(() => {
        async function carregarPaciente(idPaciente: string) {
            const vinculo = await consultarVinculosPaciente(idPaciente, 0);

            if (vinculo.dado) {
                setPaciente(vinculo.dado.content[0].paciente);
                setPsicologo(vinculo.dado.content[0].psicologo);
            }
        }


        setTipoDocumento(location.state.tipoDocumento);
        setIdSolicitacao(location.state.solicitacaoId);
        carregarPaciente(location.state.idPaciente);
    }, []);

    const handleSubmitDocumento = async (dados: DadosGeraisDocumentoModel) => {
        try {
            if (idSolicitacao) {
                const response = await cadastrarDocumento(dados, idSolicitacao);
                if (response.erro) {
                    notificarErro("Erro ao cadastrar documento.");
                } else {
                    notificarSucesso("Documento cadastrado");
                }
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

                {paciente && psicologo &&
                    <DocumentoForm
                        tipoDocumento={tipoDocumento}
                        paciente={paciente}
                        psicologo={psicologo}
                        onSubmit={handleSubmitDocumento}
                    />
                }
            </div>
        </>
    );
}