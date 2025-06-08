import "./tabelaHorario.css";

type TabelaHorarioProps = {
  diaSemana?: string[];
  horariosInicio?: string[];
  mapaHorarios: Record<string, Set<string>>;
};

const nomeDiaMap: Record<string, string> = {
  seg: "Segunda",
  ter: "Terça",
  qua: "Quarta",
  qui: "Quinta",
  sex: "Sexta",
  sab: "Sábado",
  dom: "Domingo",
};

export default function TabelaHorario({
  diaSemana = [],
  horariosInicio = [],
  mapaHorarios,
}: TabelaHorarioProps) {
  return (
    <table>
      <thead>
        <tr>
          {diaSemana.map((dia) => (
            <th key={dia}>{nomeDiaMap[dia] || dia}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {horariosInicio.map((hora, i) => (
          <tr key={i}>
            {diaSemana.map((dia) => (
              <td key={dia + i}>
                {mapaHorarios[dia]?.has(hora) ? hora : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
