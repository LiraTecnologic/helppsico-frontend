import './cardValidacaoCrp.css'
import IconeCopia from '../../../../assets/icone-copia.png'
import ValidacaoCrpModel from '../../../../models/validacaoCrp';
import calcular from '../../../../utils/calucloData'


export default function CardAvaliacaoCrp(validacao: ValidacaoCrpModel) {

    const idade = calcular(validacao.psicologo.dataNascimento);

    return (
        <div className='card-validacao-crp'>
            <div className='div-info-1'>
                <div className='div-img-info-1'>
                    <img className='img-psicologo-card-crp' src="https://randomuser.me/api/portraits/women/45.jpg" alt="Foto psicologo" />

                    <div className='div-info-psico'>
                        <h2>{validacao.psicologo.nome}</h2>
                        <p>{idade} anos</p>
                        <p>{validacao.psicologo.email}</p>
                        <p>{validacao.psicologo.telefone}</p>
                    </div>
                </div>

                <div className='div-main-container-crp'>
                    <p>CRP</p>
                    <div className='div-container-crp'>
                        <p>{validacao.crp}</p>
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