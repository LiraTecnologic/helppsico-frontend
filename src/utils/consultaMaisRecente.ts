import ConsultaModel from "../models/consulta";

export default function consultaMaisRecente(consultas: ConsultaModel[]): ConsultaModel | null {
  if (consultas.length === 0) {
    return null; 
  }
  
  const consultasOrdenadas = consultas.sort((a, b) => {
    return new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime();
  });

  return consultasOrdenadas[0];
}