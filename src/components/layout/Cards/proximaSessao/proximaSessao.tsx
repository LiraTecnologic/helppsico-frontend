import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatarData, formatarHora } from '../../../../utils/formataData';

import ConsultaModel from '../../../../models/consulta';
import calcular from '../../../../utils/calculoData';

import './proximaSessao.css';

interface ProximaSessaoProps {
  consulta?: ConsultaModel | null;
  verMais: boolean;
  fluxo: string;
}

export default function ProximasSessoes({
  consulta,
  verMais,
  fluxo
}: ProximaSessaoProps) {
  const [idade, setIdade] = useState<number>(0);
  const isPsicologo = fluxo === 'psicologo';

  useEffect(() => {

    if (consulta) {
      setIdade(calcular(consulta.psicologo.dataNascimento));
    }
  }, []);

  return (
    <div className="proxima-sessao">
      <div className="proxima-sessao__cabecalho">
        <h1>Próxima sessão</h1>

        {verMais ? (
          <button className="botao-ver-mais">
            <Link to={isPsicologo ? '/psicologo/sessao' : '/paciente/sessao'}>
              Ver mais
            </Link>
          </button>
        ):(<></>)}
      </div>

      {consulta ? (
        <div className="sessao-card">
          <div className="sessao-info">
            <img
              className="sessao-foto"
              src={consulta.paciente.fotoUrl}
              alt={isPsicologo ? 'Foto do paciente' : 'Foto do psicólogo'}
            />

            <div className="sessao-textos">
              <p className="sessao-nome">{consulta.paciente.nome}</p>
              <p>{idade} anos</p>
              <p>{consulta.paciente.telefone}</p>
            </div>
          </div>

          <div className="sessao-detalhes">
            <p>Local: {consulta.paciente.endereco.rua}</p>
            <p>Data: {formatarData(consulta.data)}</p>
            <p>Horário: {formatarHora(consulta.horario.inicio)}</p>
          </div>

          <div className="sessao-pagamento">
            <p>
              <strong>Valor:</strong> {consulta.valor}
            </p>
          </div>
        </div>
      ) : fluxo === 'paciente' ? (
        <div className="sessao-nao-marcada">
          <p className="titulo-nao-marcada">
            Ainda não marcou a próxima consulta?
          </p>
          <p className="subtitulo-nao-marcada">
            Clique no botão abaixo e marque agora mesmo!
          </p>
          <Link
            to="/paciente/agendamento"
            state={{ origem: 'paciente' }}
            className="botao-marcar"
          >
            Marcar consulta
          </Link>
        </div>
      ) : (
        <div className="sessao-nao-marcada">
          <p className="titulo-nao-marcada">
            Nenhuma consulta agendada no momento
          </p>
          <p className="subtitulo-nao-marcada">
            Assim que um paciente agendar uma nova consulta, ela aparecerá aqui automaticamente.
          </p>
        </div>
      )}
    </div>
  );
}