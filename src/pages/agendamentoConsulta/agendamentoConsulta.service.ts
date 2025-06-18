import axios from 'axios';
import PsicologoModel from '../../models/psicologo';
import Response from '../../models/response';
import ConsultaModel from '../../models/consulta';
import VinculoModel from '../../models/vinculo';
import Page from '../../models/page';

export function consultarPsicologoPeloId(idPsicologo: string): Promise<Response<PsicologoModel>> {
    return axios.get<Response<PsicologoModel>>(
        `http://localhost:8080/psicologos/${idPsicologo}`
    )
        .then(response => response.data)
        .catch(err => {
            console.error("Erro ao carregar psicologo:", err);
            return {
                dado: {} as PsicologoModel,
                erro: err
            };
        });
}

export function cadastrarConsulta(novaConsulta: ConsultaModel): Promise<Response<ConsultaModel>> {
    return axios.post<Response<ConsultaModel>>(
        'http://localhost:8080/consultas',
        novaConsulta
    )
        .then(response => response.data)
        .catch(err => {
            console.error('Erro ao cadastrar consulta: ', err);
            return {
                dado: {} as ConsultaModel,
                erro: err
            }
        })
}

export function consultarVinculoPaciente(idPaciente: string): Promise<Response<Page<VinculoModel>>> {
    return axios.get<Response<Page<VinculoModel>>>(
        `http://localhost:8080/vinculos/listar/paciente/${idPaciente}`
    ).then(response => response.data)
        .catch(err => {
            console.error('Erro ao carregar vinculo: ', err);
            return {
                dado: {
                    content: [],
                    totalElements: 0,
                    totalPages: 0,
                    number: 0,
                    size: 0
                },
                erro: err
            }
        })

}