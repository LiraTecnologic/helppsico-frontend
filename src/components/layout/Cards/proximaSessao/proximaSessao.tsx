import ConsultaModel from '../../../../models/consulta';
import calcular from '../../../../utils/calculoData'
import {formatarDataHora} from '../../../../utils/formataData'

import './proximaSessao.css';

interface ProximaSessaoProps {
  consulta: ConsultaModel,
  verMais: boolean,
  fluxo: string,
  sessaoMarcada: boolean
}

export default function ProximasSessoes(props: ProximaSessaoProps) {
  const dataFormatada = formatarDataHora(props.consulta.dataHora.inicio);
  
  
  const isPsicologo = props.fluxo === 'psicologo';
  const pessoa = isPsicologo ? props.consulta.paciente : props.consulta.psicologo;
  const idade = isPsicologo ? calcular(props.consulta.paciente.dataNascimento) : null;
  const endereco = isPsicologo ? props.consulta.paciente.endereco : props.consulta.psicologo.enderecoAtendimento;

  return (
    <div className="proxima-sessao">
      <div className="proxima-sessao__cabecalho">
        <h1>Próxima sessão</h1>
        {props.verMais && (
          <button className="botao-ver-mais">Ver mais</button>
        )}
      </div>

      {props.sessaoMarcada ? (
        <div className="sessao-card">
          <div className="sessao-info">
            <img
              className="sessao-foto"
              src={pessoa.fotoUrl || "/imagens/foto-padrao.png"}
              alt={isPsicologo ? "Foto do paciente" : "Foto do psicólogo"}
            />
            <div className="sessao-textos">
              <p className="sessao-nome">{pessoa.nome}</p>
              {isPsicologo && idade ? <p>{idade} anos</p> : null}
              <p>{pessoa.telefone}</p>
            </div>
          </div>

          <div className="sessao-detalhes">
            <p>Local: {endereco.rua}</p>
            <p>Data: {dataFormatada.data}</p>
            <p>Horário: {dataFormatada.hora}</p>
          </div>

          <div className="sessao-pagamento">
            <p><strong>Valor:</strong> {props.consulta.valor}</p>
            {/* <span className={`sessao-status ${statusPagamento?.toLowerCase().replace(' ', '-')}`}>
                {statusPagamento}
            </span> */}
          </div>
        </div>
      ) : (
        props.fluxo === "paciente" ? (
          <div className="sessao-nao-marcada">
            <p className="titulo-nao-marcada">Ainda não marcou a próxima consulta?</p>
            <p className="subtitulo-nao-marcada">
              Vá até o perfil do(a) seu(sua) psicólogo(a) e marque agora mesmo!
            </p>
            <button className="botao-marcar">Marcar consulta</button>
          </div>
        ) : (
          <div className="sessao-nao-marcada">
            <p className="titulo-nao-marcada">Nenhuma consulta agendada no momento</p>
            <p className="subtitulo-nao-marcada">
              Assim que um paciente agendar uma nova consulta, ela aparecerá aqui automaticamente.
            </p>
          </div>
        )
      )}
    </div>
  );
}
