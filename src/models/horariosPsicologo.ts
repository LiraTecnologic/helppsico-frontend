import HorairoModel from "./horario";
import PacienteModel from "./paciente";

export default interface HorairoPsicologoModel {
    id: string,
    psicologo: PacienteModel,
    horario: HorairoModel
}