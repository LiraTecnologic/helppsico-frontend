import ConsultaModel from '../../../../models/consulta';
import {formatarDataHora} from '../../../../utils/formataData';
import './sessoesAntigas.css';

interface ListagemSessoesAntigasProps {
  sessoesAntigas: ConsultaModel[];
}

export default function SessoesAntigas({ sessoesAntigas }: ListagemSessoesAntigasProps) {
  const sessoesFeitas = sessoesAntigas.filter(s => s.finalizada);

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
                  src={sessao.psicologo.fotoUrl || "/imagens/foto-padrao.png"}
                  alt="Foto do psicólogo"
                />
                <div className="sessao-antiga-textos">
                  <p className="sessao-antiga-nome">{sessao.psicologo.nome}</p>
                  <p>Data: {formatarDataHora(sessao.dataHora).data}</p>
                  <p>Horário: {formatarDataHora(sessao.dataHora).hora}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sessao-antiga-nao-marcada">
          <p className="titulo-nao-marcada">
            Ainda não marcou a próxima consulta?
          </p>
          <p className="subtitulo-nao-marcada">
            Vá até o perfil do(a) seu(sua) psicólogo(a) e marque agora mesmo!
          </p>
          <button className="botao-marcar">Marcar consulta</button>
        </div>
      )}
    </div>
  );
}