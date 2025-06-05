import './cadastroDocumento.css';
import Header from '../../components/layout/header/header';
import DocumentoForm from '../../components/documentoForm/DocumentoForm';
import { useEffect, useState } from 'react';
import PacienteModel from '../../models/paciente';
import { cadastrarDocumento } from '../../services/cadastro.service';

export default function CadastroDocumento() {
    const [Paciente, setPaciente] = useState<PacienteModel[]>([]);
    const [tipoDocumento, setTipoDocumento] = useState(String);

    useEffect(()=>{

        setTipoDocumento('ATESTADO');
    },[]);

    if (!tipoDocumento) {
        return <div>Tipo de documento não informado!</div>;
    }

    const nomeDocumento = (tipoDocumento: string) => {
        if(tipoDocumento === "ATESTADO"){
            return "Atestado";
        } else if (tipoDocumento === "DECLARACAO"){
            return "Declaração";
        } else if (tipoDocumento === "RELATORIO_PSICOLOGICO"){
            return "Relatorio Psicologico";
        } else if (tipoDocumento === "LAUDO_PSICOLOGICO"){
            return "Laudo Psicologico";
        } else if (tipoDocumento === "PARECER_PSICOLOGICO"){
            return "Parcer Psicologico";
        }
    }

    return (
        <>
            <Header fluxo='' headerPsicologo={true} />
            <div className="container-documento">
                <h1 className="cadDoc-Titulo">Cadastro de Documentos - {nomeDocumento(tipoDocumento)}</h1>
                <div className="cadDoc-Linha"></div>

                <DocumentoForm
                    tipoDocumento={tipoDocumento}
                    pacientes={pacientes}
                />
            </div>
        </>
    );
}
