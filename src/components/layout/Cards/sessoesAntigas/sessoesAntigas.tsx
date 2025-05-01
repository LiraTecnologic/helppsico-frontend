import './sessoesAntigas.css';

interface SessoesAntigasProps {
  sessaoFeita: boolean;
  nomePsicologo?: string;
  data?: string;
  horario?: string;
  valor?: string;
  statusPagamento?: 'Em aberto' | 'Pago' | 'Cancelado';
  urlFoto?: string;
}

interface ListagemSessoesAntigasProps {
  sessoesAntigas: SessoesAntigasProps[];
}

export default function SessoesAntigas({ sessoesAntigas }: ListagemSessoesAntigasProps) {
  const sessoesFeitas = sessoesAntigas.filter(s => s.sessaoFeita);

  return (
    <div className="sessao-antiga">
      <div className="sessao-antiga-cabecalho">
        <h1>Sessões Antigas</h1>
      </div>

      {sessoesFeitas.length > 0 ? (
        <div className="Card-Container">
          {sessoesFeitas.map((sessao, index) => (
            <div key={index} className="sessao-antiga-card">
              <div className="sessao-antiga-info">
                <img
                  className="sessao-antiga-foto"
                  src={sessao.urlFoto || "/imagens/foto-padrao.png"}
                  alt="Foto do psicólogo"
                />
                <div className="sessao-antiga-textos">
                  <p className="sessao-antiga-nome">{sessao.nomePsicologo}</p>
                  <p>Data: {sessao.data}</p>
                  <p>Horário: {sessao.horario}</p>
                </div>
              </div>

              <div className="sessao-antiga-pagamento">
                <p><strong>Valor:</strong> {sessao.valor}</p>
                <span className={`sessao-antiga-status ${sessao.statusPagamento?.toLowerCase().replace(' ', '-')}`}>
                  {sessao.statusPagamento}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sessao-antiga-nao-marcada">
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