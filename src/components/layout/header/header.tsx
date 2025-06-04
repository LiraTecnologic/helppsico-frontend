import "./header.css";
import imagemPaciente from "../../../assets/imagemPaciente.jpg";
import logo from "../../../assets/logo.png";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  fluxo: string;
  headerPsicologo: boolean;
}

export default function Header({ fluxo, headerPsicologo }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const closeMenu = () => setOpenMenu(false);
  const usuario = headerPsicologo ? "psicologo" : "paciente";

  return (
    <>
      <header className="header">
        <button className="btn-mobile" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <FaXmark /> : <FaBars />}
        </button>

        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="nav-foto-container">
          <nav className="nav">
            <ul>
              <li className={fluxo === "meuPainel" ? "active" : ""}>
                <Link to={`/${usuario}/painel`}>Meu painel</Link>
              </li>

              {headerPsicologo && (
                <>
                  <li className={fluxo === "dadosPessoais" ? "active" : ""}>
                    <Link to={`/${usuario}/pacientes`}>Dados Pessoais</Link>
                    {/* FALTA TELA */}
                  </li>

                  <li className={fluxo === "meusPacientes" ? "active" : ""}>
                    <Link to={`/${usuario}/pacientes`}>Meus pacientes</Link>
                  </li>
                </>
              )}

              <li className={fluxo === "minhasSessoes" ? "active" : ""}>
                <Link to={`/${usuario}/sessao`}>Minhas sessões</Link>
              </li>

              <li className={fluxo === "verProfissionais" ? "active" : ""}>
                <Link to={`/psicologos`} state={{ headerPsicologo }}>
                  Ver profissionais
                </Link>
              </li>

              {usuario === "paciente" && (
                <li className={fluxo === "solicitacoesVinculo" ? "active" : ""}>
                  <Link to="/paciente/solicitacao-vinculo">
                    Solicitações de Vinculo
                  </Link>
                </li>
                
              )}
            </ul>
          </nav>

          <div className="foto">
            <img src={imagemPaciente} alt="Foto do usuário" />
          </div>
        </div>
      </header>

      <nav className={`nav-mobile ${openMenu ? "open" : ""}`}>
        <ul>
          <li className={fluxo === "meuPainel" ? "active" : ""}>
            <Link to={`/${usuario}/painel`} onClick={closeMenu}>
              Meu painel
            </Link>
          </li>

          {headerPsicologo && (
            <>
              <li className={fluxo === "dadosPessoais" ? "active" : ""}>
                <Link to={`/${usuario}/pacientes`} onClick={closeMenu}>
                  Dados Pessoais {/* FALTA TELA */}
                </Link>
              </li>

              <li className={fluxo === "meusPacientes" ? "active" : ""}>
                <Link to={`/${usuario}/pacientes`} onClick={closeMenu}>
                  Meus pacientes
                </Link>
              </li>
            </>
          )}

          <li className={fluxo === "minhasSessoes" ? "active" : ""}>
            <Link to={`/${usuario}/psicologo`} onClick={closeMenu}>
              {/* ainda n feito */}
              Minhas sessões
            </Link>
          </li>

          <li className={fluxo === "verProfissionais" ? "active" : ""}>
            <Link
              to={`/psicologos`}
              onClick={closeMenu}
              state={{ headerPsicologo }}
            >
              Ver profissionais
            </Link>
          </li>

          {usuario === "paciente" && (
            <li className={fluxo === "solicitacoesVinculo" ? "active" : ""}>
              <Link to="/paciente/solicitacao-vinculo">
                Solicitações de Vinculo
              </Link>
            </li>
          )}

        </ul>
      </nav>
    </>
  );
}
