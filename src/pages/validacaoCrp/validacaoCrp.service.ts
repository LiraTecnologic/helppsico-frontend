import axios from 'axios';
import Page from '../../models/page';
import ValidacaoCrpModel from '../../models/validacaoCrp';
import Response from '../../models/response';

export function consultaValidacoesCrp(page: number): Promise<Response<Page<ValidacaoCrpModel>>> {
    return axios.get<Response<Page<ValidacaoCrpModel>>>(
        `http://localhost:8080/validacao-crp?page=${page}&size=${15}`
    )
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.error("Erro ao carregar validações:", err);
            return {
                dado: {
                    content: [],
                    totalElements: 0,
                    totalPages: 0,
                    number: 0,
                    size: 0
                },
                erro: ""
            };
        });
}

export function validarCrp(id: string, validacao: ValidacaoCrpModel) {
  return axios.delete<Response<ValidacaoCrpModel>>(
    `http://localhost:8080/validacao-crp/${id}`,
    {
      data: validacao
    }
  ).catch(err => {
      console.error("Erro ao validar CRP:", err);
      return {
        dado: {} as ValidacaoCrpModel,
        erro: "Erro ao validar CRP"
      };
    });
}