import PacienteModel from "./paciente";
import PsicologoModel from "./psicologo";

export interface AvaliacaoModel {
  id: string;
  psicologo: PsicologoModel;
  paciente: PacienteModel;
  nota: number;
  comentario: string;
  data: string;
}