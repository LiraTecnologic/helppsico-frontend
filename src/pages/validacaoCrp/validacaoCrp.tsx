import CardAvaliacaoCrp from '../../components/layout/Cards/cardValidacaoCrp/cardValidacaoCrp';
import Header from '../../components/layout/header/header';
import './validacaoCrp.css'

export default function ValidacaoCrp() {
    return (
        <div>
            <Header fluxo='' headerPsicologo={false}></Header>
            <main className=''>
                <h1>CRPs()</h1>
                <CardAvaliacaoCrp/>
            </main>
        </div>
    );
}