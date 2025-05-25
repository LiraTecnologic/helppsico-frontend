import EnderecoModel from "./endereco";

export default interface PacienteModel {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  genero: string;
  endereco: EnderecoModel;
  fotoUrl: string;
}