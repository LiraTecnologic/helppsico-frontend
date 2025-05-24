import './tabelaHorario.css';

type TabelaHorarioProps = {
  diasSelecionados: string[];
  horariosInicio: string[];
};

const nomeDiaMap: Record<string, string> = {
  seg: 'Segunda',
  ter: 'Terça',
  qua: 'Quarta',
  qui: 'Quinta',
  sex: 'Sexta',
  sab: 'Sábado',
  dom: 'Domingo',
};

export default function TabelaHorario({ diasSelecionados, horariosInicio }: TabelaHorarioProps) {
  return (
    <table>
      <thead>
        <tr>
          {diasSelecionados.map((dia) => (
            <th key={dia}>{nomeDiaMap[dia] || dia}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {horariosInicio.map((hora, i) => (
          <tr key={i}>
            {diasSelecionados.map((dia) => (
              <td key={dia + i}>{hora}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}