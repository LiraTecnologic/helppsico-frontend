import './cardValidacaoCrp.css'
import IconeCopia from '../../../../assets/icone-copia.png'
import ValidacaoCrpModel from '../../../../models/validacaoCrp';
import calcular from '../../../../utils/calucloData'

import { toast } from 'react-toastify'


export default function CardValidacaoCrp(validacao: ValidacaoCrpModel) {

    const idade = calcular(validacao.psicologo.dataNascimento);

    const notificar = () => {
        navigator.clipboard.writeText(validacao.crp)
            .then(() => {
                toast.success('CRP copiado com sucesso!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            })
            .catch(() => {
                toast.error('Erro ao copiar o CRP!', {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'colored',
                });
            });
    }


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
                        <button className='button-copiar' onClick={notificar}><img src={IconeCopia} alt="Icone de cópia" /></button>
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