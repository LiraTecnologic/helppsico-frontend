import axios from 'axios';
import Page from '../../models/page';
import ValidacaoCrpModel from '../../models/validacaoCrp';
import Response from '../../models/response';
import PsicologoModel from '../../models/psicologo';


const dadosMockados: ValidacaoCrpModel[] = [
  {
    id: '1',
    psicologo: {
      id: '101',
      nome: 'Maria Silva',
      crp: '06/12345',
      cpf: '123.456.789-00',
      email: 'maria.silva@exemplo.com',
      telefone: '(11) 98765-4321',
      dataNascimento: '1985-05-15',
      genero: 'Feminino',
      enderecoAtendimento: 'Rua das Flores, 123 - São Paulo/SP',
      biografia: 'Psicóloga clínica com especialização em terapia cognitivo-comportamental.',
      status: 'PENDENTE',
      fotoUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    crp: '06/12345',
    motivoReprova: ''
  },
  {
    id: '2',
    psicologo: {
      id: '102',
      nome: 'João Santos',
      crp: '08/54321',
      cpf: '987.654.321-00',
      email: 'joao.santos@exemplo.com',
      telefone: '(21) 91234-5678',
      dataNascimento: '1978-10-20',
      genero: 'Masculino',
      enderecoAtendimento: 'Av. Atlântica, 500 - Rio de Janeiro/RJ',
      biografia: 'Psicólogo com experiência em atendimento a adolescentes e adultos.',
      status: 'PENDENTE',
      fotoUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    crp: '08/54321',
    motivoReprova: ''
  },
  {
    id: '3',
    psicologo: {
      id: '103',
      nome: 'Ana Oliveira',
      crp: '04/98765',
      cpf: '456.789.123-00',
      email: 'ana.oliveira@exemplo.com',
      telefone: '(31) 97654-3210',
      dataNascimento: '1990-03-25',
      genero: 'Feminino',
      enderecoAtendimento: 'Rua das Acácias, 789 - Belo Horizonte/MG',
      biografia: 'Psicóloga especialista em psicologia infantil e familiar.',
      status: 'PENDENTE',
      fotoUrl: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    crp: '04/98765',
    motivoReprova: ''
  }
];

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
                    content: dadosMockados,
                    totalElements: dadosMockados.length,
                    totalPages: 1,
                    number: 0,
                    size: dadosMockados.length
                },
                erro: ""
            };
        });
}

export function validarCrp(id: string, validacao?: ValidacaoCrpModel) {
  return axios.put<Response<ValidacaoCrpModel>>(
    `http://localhost:8080/validacao-crp/${id}`,
    validacao
  )
    .then(response => {
      console.log(response.data);
      return response.data.dado;
    })
    .catch(err => {
      console.error("Erro ao validar CRP:", err);
      
      const validacaoMockada = dadosMockados.find(v => v.id === id);
      return {
        dado: validacaoMockada || {} as ValidacaoCrpModel,
        erro: validacaoMockada ? "" : "Erro ao validar CRP"
      };
    });
}