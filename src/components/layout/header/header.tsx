import './header.css';
import 'react';
import imagemPaciente from '../../../assets/imagemPaciente.jpg';
import logo from '../../../assets/logo.png'
import { FaBars, FaXmark } from "react-icons/fa6";
import { useState } from 'react';

interface HeaderProps {
    fluxo: string;
    headerPsicologo: boolean;
}

export default function Header(props: HeaderProps) {

    const [openMenu, setOpenMenu] = useState<Boolean>(false);

    const closeMenu = () => setOpenMenu(false);

    return (
        <>
            <header className="header">
                <button className="btn-mobile" onClick={() => setOpenMenu(!openMenu)}>
                    {openMenu ? <FaXmark/> : <FaBars/>}
                </button>

                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>

                <div className="nav-foto-container">
                    <nav className="nav">
                        <ul>
                            <li className={props.fluxo === 'meuPainel' ? 'active' : ''}>
                                <a href="#meuPainel">Meu painel</a>
                            </li>
                            {props.headerPsicologo && (
                                <li className={props.fluxo === 'meusPacientes' ? 'active': ''}>
                                    <a href="#meusPacientes">Meus pacientes</a>
                                </li>
                            )}
                            <li className={props.fluxo === 'minhasSessoes' ? 'active' : ''}>
                                <a href="#minhasSessoes">Minhas sessões</a>
                            </li>
                            <li className={props.fluxo === 'verProfissionais' ? 'active' : ''}>
                                <a href="#verProfissionais">Ver profissionais</a>
                            </li>
                        </ul>
                    </nav>

                    <div className="foto">
                        <img src={imagemPaciente} alt="Foto do usuário" />
                    </div>
                </div>
            </header>

            <nav className={`nav-mobile ${openMenu ? 'open' : ''}`}>
                <ul>
                    <li className={props.fluxo === 'meuPainel' ? 'active' : ''}>
                        <a href="#meuPainel" onClick={closeMenu}>Meu painel</a>
                    </li>
                    {props.headerPsicologo && (
                        <li className={props.fluxo === 'meusPacientes' ? 'active': ''}>
                            <a href="#meusPacientes" onClick={closeMenu}>Meus pacientes</a>
                        </li>
                    )}
                    <li className={props.fluxo === 'minhasSessoes' ? 'active' : ''}>
                        <a href="#minhasSessoes" onClick={closeMenu}>Minhas sessões</a>
                    </li>
                    <li className={props.fluxo === 'verProfissionais' ? 'active' : ''}>
                        <a href="#verProfissionais" onClick={closeMenu}>Ver profissionais</a>
                    </li>
                </ul>
            </nav>
        </>
    );
}