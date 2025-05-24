export default interface HorairoModel {
    id:string,
    diaSemana: string,
    inicio: string,
    fim: string,
    disponivel: Disponibilidade;
}

enum Disponibilidade {
  DISPONIVEL = "DISPONIVEL",
  RESERVADO = "RESERVADO",
  INDISPONIVEL = "INDISPONIVEL"
}