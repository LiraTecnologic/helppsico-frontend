import PsicologoModel from "./psicologo";

export interface HorarioModel {
  id: string;
  psicologo: PsicologoModel;
  diaSemana: string[];
  inicio: string;
  fim: string;
  intervalo: number;
  duracao: number;
  disponivel: boolean;
}