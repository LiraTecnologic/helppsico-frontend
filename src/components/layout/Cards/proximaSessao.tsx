import './proximaSessao.css';

interface ProximasSessoesProps {
  sessaoMarcada: boolean;
  nomePsicologo?: string;
  idade?: string;
  telefone?: string;
  local?: string;
  data?: string;
  horario?: string;
  valor?: string;
  statusPagamento?: 'Em aberto' | 'Pago' | 'Cancelado';
}

export default function ProximasSessoes({
  sessaoMarcada,
  nomePsicologo,
  idade,
  telefone,
  local,
  data,
  horario,
  valor,
  statusPagamento
}: ProximasSessoesProps) {
  return (
    <div className="proxima-sessao">
      <div className="proxima-sessao__cabecalho">
        <h3>Próxima sessão</h3>
        <button className="botao-ver-mais">Ver mais</button>
      </div>

      {sessaoMarcada ? (
        <div className="sessao-card">
          <div className="sessao-info">
            <img
              className="sessao-foto"
              src="https://via.placeholder.com/60"
              alt="Foto do psicólogo"
            />
            <div className="sessao-textos">
              <p className="sessao-nome">{nomePsicologo}</p>
              <p>{idade}</p>
              <p>{telefone}</p>
            </div>
          </div>

          <div className="sessao-detalhes">
            <p>Local: {local}</p>
            <p>Data: {data}</p>
            <p>Horário: {horario}</p>
          </div>

          <div className="sessao-pagamento">
            <p><strong>Valor:</strong> {valor}</p>
            <span className={`sessao-status ${statusPagamento?.toLowerCase().replace(' ', '-')}`}>
                {statusPagamento}
            </span>
          </div>
        </div>
      ) : (
        <div className="sessao-nao-marcada">
          <p className="titulo-nao-marcada">Ainda não marcou a próxima consulta?</p>
          <p className="subtitulo-nao-marcada">
            Vá até o perfil do(a) seu(sua) psicólogo(a) e marque agora mesmo!
          </p>
          <button className="botao-marcar">Marcar consulta</button>
        </div>
      )}
    </div>
  );
}
