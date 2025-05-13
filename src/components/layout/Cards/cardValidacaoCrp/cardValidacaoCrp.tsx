import './cardValidacaoCrp.css'

export default function CardAvaliacaoCrp() {
    return (
        <div className='card-validacao-crp'>
            <div className='div-info-1'>
                <div className='div-img-info-1'>
                    <img className='img-psicologo-card-crp' src="https://randomuser.me/api/portraits/women/45.jpg" alt="Foto psicologo" />

                    <div>
                        <h2>Nome psicologo legal</h2>
                        <p>XX anos</p>
                        <p>email@simsim.com</p>
                        <p>(22) 9 9999-9999</p>
                    </div>
                </div>

                <div>
                    <p>CRP</p>
                    <div>
                        <p>32-654871</p>
                        <img src="" alt="" />
                    </div>
                </div>
            </div>
            <div className='botoes-card-crp'>
                <button>Reprovar</button>
                <button>Aprovar</button>
            </div>
        </div>
    );
}