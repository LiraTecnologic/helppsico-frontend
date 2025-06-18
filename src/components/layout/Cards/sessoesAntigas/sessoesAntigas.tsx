import ConsultaModel from '../../../../models/consulta';
import {formatarData} from '../../../../utils/formataData';
import './sessoesAntigas.css';

interface ListagemSessoesAntigasProps {
  sessoesAntigas: ConsultaModel[];
  fluxo?: string; 
}

export default function SessoesAntigas({ sessoesAntigas, fluxo = 'paciente' }: ListagemSessoesAntigasProps) {
  const sessoesFeitas = sessoesAntigas.filter(s => s.finalizada);
  const isPsicologo = fluxo === 'psicologo';

  return (
    <div className="sessao-antiga">
      <div className="sessao-antiga-cabecalho">
        <h1>Sessões Antigas</h1>
      </div>

      {sessoesFeitas.length > 0 ? (
        <div className="Card-Container">
          {sessoesFeitas.map((sessao, index) => {
            
            const pessoa = isPsicologo ? sessao.paciente : sessao.psicologo;
            
            return (
              <div key={index} className="sessao-antiga-card">
                <div className="sessao-antiga-info">
                  <img
                    className="sessao-antiga-foto"
                    src={pessoa.fotoUrl || "/imagens/foto-padrao.png"}
                    alt={isPsicologo ? "Foto do paciente" : "Foto do psicólogo"}
                  />
                  <div className="sessao-antiga-textos">
                    <p className="sessao-antiga-nome">{pessoa.nome}</p>
                    <p>Data: {formatarData(sessao.data)}</p>
                    <p>Horário: {sessao.horario.inicio}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="sessao-antiga-nao-marcada">
          {isPsicologo ? (
            <>
              <p className="titulo-nao-marcada">Nenhuma sessão anterior registrada</p>
              <p className="subtitulo-nao-marcada">
                Quando você realizar consultas com seus pacientes, elas aparecerão aqui.
              </p>
            </>
          ) : (
            <>
              <p className="titulo-nao-marcada">Ainda não marcou a próxima consulta?</p>
              <p className="subtitulo-nao-marcada">
                Vá até o perfil do(a) seu(sua) psicólogo(a) e marque agora mesmo!
              </p>
              <button className="botao-marcar">Marcar consulta</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}