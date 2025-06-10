export function formatarData(dataAtendimento: string) {
  return dataAtendimento.split("-").reverse().join("/");
}

export function formatarHora(hora: string) {
  return hora.split(":").slice(0, 2).join(":");
}