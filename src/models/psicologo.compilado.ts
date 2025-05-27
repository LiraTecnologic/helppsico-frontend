import { AvaliacaoModel } from "./avaliacoes";
import PsicologoModel from "./psicologo";

export interface PsicologoCompilado {
  psicologo: PsicologoModel;
  avaliacao: AvaliacaoModel[];
}