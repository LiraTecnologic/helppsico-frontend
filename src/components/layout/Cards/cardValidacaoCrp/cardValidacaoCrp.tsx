import './cardValidacaoCrp.css'
import IconeCopia from '../../../../assets/icone-copia.png'
import ValidacaoCrpModel from '../../../../models/validacaoCrp';
import calcular from '../../../../utils/calucloData'
import { copiarParaAreaDeTransferencia } from '../../../../utils/notificacoes';

interface Props {
    validacao: ValidacaoCrpModel,
    onReprovar: () => void;
    onAprovar: () => void;
}

export default function CardValidacaoCrp(props: Props) {

    const idade = calcular(props.validacao.psicologo.dataNascimento);


    return (
        <div className='card-validacao-crp'>
            <div className='div-info-1'>
                <div className='div-img-info-1'>
                    <img className='img-psicologo-card-crp' src="https://randomuser.me/api/portraits/women/45.jpg" alt="Foto psicologo" />

                    <div className='div-info-psico'>
                        <h2>{props.validacao.psicologo.nome}</h2>
                        <p>{idade} anos</p>
                        <p>{props.validacao.psicologo.email}</p>
                        <p>{props.validacao.psicologo.telefone}</p>
                    </div>
                </div>

                <div className='div-main-container-crp'>
                    <p>CRP</p>
                    <div className='div-container-crp'>
                        <p>{props.validacao.crp}</p>
                        <button className='button-copiar' onClick={() => copiarParaAreaDeTransferencia(props.validacao.crp, 'CRP')}><img src={IconeCopia} alt="Icone de cópia" /></button>
                    </div>
                </div>
            </div>
            <div className='botoes-card-crp'>
                <button className='botao-reprovar' onClick={props.onReprovar}>Reprovar</button>
                <button className='botao-aprovar' onClick={props.onAprovar}>Aprovar</button>
            </div>
        </div>
    );
}