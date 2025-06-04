import EnderecoModel from "./endereco"

export default interface PsicologoModel {
    id:string,
    nome:string,
    crp:string,
    cpf:string,
    email:string,
    telefone:string,
    dataNascimento:string,
    genero:string,
    enderecoAtendimento:EnderecoModel,
    biografia:string,
    status:string,
    fotoUrl:string,
    valorSessao: number,
    tempoSessao: number
}