export function formatarDataHora(dataAtendimento: string) {
  const [data, hora] = dataAtendimento.split("T");
  return {
    data: data.split("-").reverse().join("/"),
    hora: hora.slice(0, 5),
  };
}

export function formatarData(dataAtendimento: string) {
  return dataAtendimento.split("-").reverse().join("/");
} 