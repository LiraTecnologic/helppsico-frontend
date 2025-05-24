import PacienteModel from "./paciente";

export interface AvaliacaoModel {
  id: string;
  psicologoId: string;
  paciente: PacienteModel;
  nota: number;
  comentario: string;
  data: string;
}