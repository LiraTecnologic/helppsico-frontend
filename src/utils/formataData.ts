export default function formatarDataHora(dataAtendimento: string) {
  const [data, hora] = dataAtendimento.split("T");
  return {
    data: data.split("-").reverse().join("/"), // opcional: "18/05/2025"
    hora: hora.slice(0, 5), // "14:30"
  };
}