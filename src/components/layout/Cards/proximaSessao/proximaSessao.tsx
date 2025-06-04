import ConsultaModel from '../../../../models/consulta';
import calcular from '../../../../utils/calculoData'
import {formatarDataHora} from '../../../../utils/formataData'
import ConsultaModel from "../../../../models/consulta";
import calcular from "../../../../utils/calculoData";
import formatarDataHora from "../../../../utils/formataData";
import { Link } from "react-router-dom";

import "./proximaSessao.css";

interface ProximaSessaoProps {
  consulta: ConsultaModel;
  verMais: boolean;
  fluxo: string;
  sessaoMarcada: boolean;

}

export default function ProximasSessoes({
  consulta,
  verMais,
  fluxo,
  sessaoMarcada,
}: ProximaSessaoProps) {
  const isPsicologo = props.fluxo === 'psicologo';
  const pessoa = isPsicologo ? props.consulta.paciente : props.consulta.psicologo;
  const idade = isPsicologo ? calcular(props.consulta.paciente.dataNascimento) : null;
  const endereco = isPsicologo ? props.consulta.paciente.endereco : props.consulta.psicologo.enderecoAtendimento;

  return (
    <div className="proxima-sessao">
      <div className="proxima-sessao__cabecalho">
        <h1>Próxima sessão</h1>
        {verMais && fluxo === "paciente" && <button className="botao-ver-mais"><Link to="/paciente/sessao">Ver mais</Link></button>}
        {verMais && fluxo === "psicologo" && <button className="botao-ver-mais"><Link to="/paciente/sessao">Ver mais</Link></button>}{/*  falta tela */}
      </div>

      {sessaoMarcada ? (
        <div className="sessao-card">
          <div className="sessao-info">
            <img
              className="sessao-foto"
              src={consulta.paciente.fotoUrl}
              alt={isPsicologo ? "Foto do paciente" : "Foto do psicólogo"}
            />
            <div className="sessao-textos">
              <p className="sessao-nome">{consulta.paciente.nome}</p>
              <p>{idade} anos</p>
              <p>{consulta.paciente.telefone}</p>

            </div>
          </div>

          <div className="sessao-detalhes">
            <p>Local: {consulta.paciente.endereco.rua}</p>

            <p>Data: {dataFormatada.data}</p>
            <p>Horário: {dataFormatada.hora}</p>
          </div>

          <div className="sessao-pagamento">
            <p>
              <strong>Valor:</strong> {consulta.valor}
            </p>
            {/* <span className={`sessao-status ${statusPagamento?.toLowerCase().replace(' ', '-')}`}>
                {statusPagamento}
            </span> */}
          </div>
        </div>
      ) : fluxo === "paciente" ? (
        <div className="sessao-nao-marcada">
          <p className="titulo-nao-marcada">
            Ainda não marcou a próxima consulta?
          </p>
          <p className="subtitulo-nao-marcada">
            Clique no botão abaixo e marque agora mesmo!
          </p>
          <button className="botao-marcar"><Link to="/paciente/agendamento">Marcar consulta</Link></button>
        </div>
      ) : (
        <div className="sessao-nao-marcada">
          <p className="titulo-nao-marcada">
            Nenhuma consulta agendada no momento
          </p>
          <p className="subtitulo-nao-marcada">
            Assim que um paciente agendar uma nova consulta, ela aparecerá aqui
            automaticamente.
          </p>
        </div>
      )}
    </div>
  );
}