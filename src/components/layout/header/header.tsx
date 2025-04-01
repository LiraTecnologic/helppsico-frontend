import './header.css';
import 'react';
import imagemPaciente from '../../../assets/imagemPaciente.jpg';

interface HeaderProps {
    tela: string;
}

export default function Header(props: HeaderProps) {
    return (
        <header className="header">
            <div className="logo">
                <img src="caminho-da-sua-logo.png" alt="Logo" />
            </div>


            <div className="nav-foto-container">
                <nav className="nav">
                    <ul>
                        <li className={props.tela === 'meuPainel' ? 'active' : ''}>
                            <a href="#meuPainel">Meu painel</a>
                        </li>
                        <li className={props.tela === 'minhasSessoes' ? 'active' : ''}>
                            <a href="#minhasSessoes">Minhas sessões</a>
                        </li>
                        <li className={props.tela === 'verProfissionais' ? 'active' : ''}>
                            <a href="#verProfissionais">Ver profissionais</a>
                        </li>
                    </ul>
                </nav>

                <div className="foto">
                    <img src={imagemPaciente} alt="Foto do usuário" />
                </div>
            </div>
        </header>
    );
}
