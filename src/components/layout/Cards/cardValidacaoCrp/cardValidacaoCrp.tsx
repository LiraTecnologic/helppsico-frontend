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
                    <img 
                        className='img-psicologo-card-crp' 
                        src={props.validacao.psicologo.fotoUrl} 
                        alt={`Foto de ${props.validacao.psicologo.nome}`} 
                    />
                    <div className='div-info-psico'>
                        <h2 className='nome-psicologo'>{props.validacao.psicologo.nome}</h2>
                        <p className='idade-psicologo'>{idade} anos</p>
                        <p className='email-psicologo'>{props.validacao.psicologo.email}</p>
                        <p className='telefone-psicologo'>{props.validacao.psicologo.telefone}</p>
                    </div>
                </div>
                <div className='div-main-container-crp'>
                    <p className='label-crp'>CRP</p>
                    <div className='div-container-crp'>
                        <p className='numero-crp'>{props.validacao.crp}</p>
                        <button 
                            className='button-copiar' 
                            onClick={() => copiarParaAreaDeTransferencia(props.validacao.crp, 'CRP')}
                            aria-label='Copiar CRP'
                        >
                            <img className='img-icone-copiar' src={IconeCopia} alt="Copiar CRP" />
                        </button>
                    </div>
                </div>
            </div>
            <div className='botoes-card-crp'>
                <button className='botao-reprovar' onClick={props.onReprovar}>
                    Reprovar
                </button>
                <button className='botao-aprovar' onClick={props.onAprovar}>
                    Aprovar
                </button>
            </div>
        </div>
    );
}