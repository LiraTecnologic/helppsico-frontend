import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatarData, formatarHora } from '../../../../utils/formataData';
import ConsultaModel from '../../../../models/consulta';
import calcular from '../../../../utils/calculoData';
import { finalizarConsulta } from './proximaSessao.service';
import './proximaSessao.css';
import { notificarSucesso } from '../../../../utils/notificacoes';

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
    if (consulta?.psicologo?.dataNascimento) {
      setIdade(calcular(consulta.psicologo.dataNascimento));
    }
  }, [consulta]);

  async function finalizar() {

    if(consulta) {
      finalizarConsulta(consulta.id)
        .then(() => {
          notificarSucesso("Consula finalizada com sucesso !");
        })
    }
      

  }

  return (
    <div className="proxima-sessao">
      <div className="proxima-sessao__cabecalho">
        <h1>Próxima sessão</h1>
        {verMais && (
          <button className="botao-ver-mais">
            <Link to={isPsicologo ? '/psicologo/sessao' : '/paciente/sessao'}>
              Ver mais
            </Link>
          </button>
        )}
      </div>

      {consulta ? (
        <div className="sessao-card">
          <div className="sessao-info">
            <img
              className="sessao-foto"
              src={consulta.paciente?.fotoUrl || '/default-avatar.png'}
              alt={isPsicologo ? 'Foto do paciente' : 'Foto do psicólogo'}
              onError={(e) => {
                e.currentTarget.src = '/default-avatar.png';
              }}
            />
            <div className="sessao-textos">
              <p className="sessao-nome">{consulta.paciente?.nome || 'Nome não informado'}</p>
              <p>{idade > 0 ? `${idade} anos` : 'Idade não informada'}</p>
              <p>{consulta.paciente?.telefone || 'Telefone não informado'}</p>
            </div>
          </div>
          <div className="sessao-detalhes">
            <p>Local: {consulta.paciente?.endereco?.rua || 'Endereço não informado'}</p>
            <p>Data: {consulta.data ? formatarData(consulta.data) : 'Data não informada'}</p>
            <p>Horário: {consulta.horario?.inicio ? formatarHora(consulta.horario.inicio) : 'Horário não informado'}</p>
          </div>
          <div className="sessao-pagamento">
            <p>
              <strong>Valor:</strong> {consulta.valor || 'Valor não informado'}
            </p>
          </div>

          {fluxo != 'paciente' ? (
              <button className="botao-verMais" onClick={finalizar}>Finalizar</button>
            ) : (<></>)
          }

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