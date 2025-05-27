

export interface Paciente {
    id: string;
    nome: string;
    email: string;
    telefone: string;
  }
  
  export interface Psicologo {
    id: string;
    nome: string;
    crp: string;
    email: string;
  }
  
  export enum TipoDocumento {
    ATESTADO = 'ATESTADO',
    DECLARACAO = 'DECLARACAO',
    RELATORIO_PSICOLOGICO = 'RELATORIO_PSICOLOGICO',
    RELATORIO_MULTIPROFISSIONAL = 'RELATORIO_MULTIPROFISSIONAL',
    LAUDO_PSICOLOGICO = 'LAUDO_PSICOLOGICO',
    PARECER_PSICOLOGICO = 'PARECER_PSICOLOGICO'
  }
  
  export interface Documento {
    id: string; 
    paciente: Paciente;
    psicologo: Psicologo;
    tipoDocumento: TipoDocumento;
    dataEmissao: string; 
    dataValidade: string; 
    assinaturaPsicologo: string;
    status: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
    dataSolicitacao: string;
  }
  
  export interface SolicitacaoDocumento {
    id: string;
    documento: Documento;
    status: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
    dataSolicitacao: string;
  }