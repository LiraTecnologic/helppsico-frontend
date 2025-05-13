import './cardValidacaoCrp.css'
import IconeCopia from '../../../../assets/icone-copia.png'

export default function CardAvaliacaoCrp() {
    return (
        <div className='card-validacao-crp'>
            <div className='div-info-1'>
                <div className='div-img-info-1'>
                    <img className='img-psicologo-card-crp' src="https://randomuser.me/api/portraits/women/45.jpg" alt="Foto psicologo" />

                    <div className='div-info-psico'>
                        <h2>Nome psicologo legal</h2>
                        <p>XX anos</p>
                        <p>email@simsim.com</p>
                        <p>(22) 9 9999-9999</p>
                    </div>
                </div>

                <div className='div-main-container-crp'>
                    <p>CRP</p>
                    <div className='div-container-crp'>
                        <p>32-654871</p>
                        <button className='button-copiar'><img src={IconeCopia} alt="Icone de cópia" /></button>
                    </div>
                </div>
            </div>
            <div className='botoes-card-crp'>
                <button className='botao-reprovar'>Reprovar</button>
                <button className='botao-aprovar'>Aprovar</button>
            </div>
        </div>
    );
}