import PacienteModel from "./paciente";
import PsicologoModel from "./psicologo";

enum TipoDocumento {
  ATESTADO = 'ATESTADO',
  DECLARACAO = 'DECLARACAO',
  RELATORIO_PSICOLOGICO = 'RELATORIO_PSICOLOGICO',
  RELATORIO_MULTIPROFISSIONAL = 'RELATORIO_MULTIPROFISSIONAL',
  LAUDO_PSICOLOGICO = 'LAUDO_PSICOLOGICO',
  PARECER_PSICOLOGICO = 'PARECER_PSICOLOGICO'
}

export default interface SolicitacaoDocumentoModel {
    id:string;
    paciente:PacienteModel;
    psicologo:PsicologoModel;
    tipoDocumento:TipoDocumento;
    data:string;
    status:string;
}