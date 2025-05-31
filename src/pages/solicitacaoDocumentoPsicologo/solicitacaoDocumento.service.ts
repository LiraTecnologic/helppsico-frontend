import axios from 'axios';
import SolicitacaoDocumentoModel from '../../models/solicitacaoDocumento';
import Page from '../../models/page'
import Response from '../../models/response';

export function listarSolicitacoesDocumento(idPsicologo: string, page: number): Promise<Response<Page<SolicitacaoDocumentoModel>>> {
    return axios.get<Response<Page<SolicitacaoDocumentoModel>>>(
        `http://localhost:8080/solicitacoes-documentos/${idPsicologo}?page=${page}&size=${15}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar solicitações:", err);
            return {
                dado: {
                    content: [],
                    totalElements: 0,
                    totalPages: 0,
                    number: 0,
                    size: 0
                },
                erro: err
            };
        });
}

export function rejeitarSolicitacaoDocumento(idSolicitacao: string) {
    axios.delete(
        `http://localhost:8080/solicitacoes-documentos/${idSolicitacao}`
    )
        .catch(err => {
            console.error("Erro ao carregar consultas:", err);
        });
}