export default function formatarDataHora(dataAtendimento: string) {
  const [data, hora] = dataAtendimento.split("T");
  return {
    data: data.split("-").reverse().join("/"), 
    hora: hora.slice(0, 5), 
  };
} 