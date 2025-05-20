
import Header from '../../components/layout/header/header';
import ValidacaoCrpModel from '../../models/validacaoCrp';
import { useState, useEffect } from 'react';
import './validacaoCrp.css'
import CardValidacaoCrp from '../../components/layout/Cards/cardValidacaoCrp/cardValidacaoCrp';
import ModalReprovar from '../../components/layout/validacaoCrp/reprovar/modalReprovar';
import ModalAprovar from '../../components/layout/validacaoCrp/aprovar/modalAprovar';
import { consultaValidacoesCrp } from './validacaoCrp.service';
 
export default function ValidacaoCrp() {

    const [validacoes, setValidacoes] = useState<ValidacaoCrpModel[]>([]);
    const [mostrarModalReprovar, setMostrarModalReprovar] = useState(false);
    const [mostrarModalAprovar, setMostrarModalAprovar] = useState(false);
    const [psicologoSelecionado, setPsicologoSelecionado] = useState<string | null>(null);

    useEffect(() => {
        async function carregarValidacoes() {
            const validacoes = await consultaValidacoesCrp(1);
            setValidacoes(validacoes.dado.content);
        }

        carregarValidacoes();
        console.log(validacoes);
    }, []);


    const abrirModalReprovar = (id: string) => {
        setPsicologoSelecionado(id);
        setMostrarModalReprovar(true);
    };

    const fecharModalReprovar = () => {
        setMostrarModalReprovar(false);
        setPsicologoSelecionado(null);
    };

    const abrirModalAprovar = (id: string) => {
        setPsicologoSelecionado(id);
        setMostrarModalAprovar(true);
    };

    const fecharModalAprovar = () => {
        setMostrarModalAprovar(false);
        setPsicologoSelecionado(null);
    };



    return (
        <>
            <Header fluxo='' headerPsicologo={false}></Header>
            <main className='main-validacao-crp'>
                <h1 className='titulo-main-validacao-crp' >CRPs({validacoes.length})</h1>
                {validacoes.map((validacao) => (
                    <CardValidacaoCrp
                        key={validacao.id}
                        validacao={validacao}
                        onReprovar={() => abrirModalReprovar(validacao.id)}
                        onAprovar={() => abrirModalAprovar(validacao.id)}
                    />
                ))}

            </main>


            {mostrarModalReprovar && (
                <>
                    <div className='modal-overlay'></div>
                    <ModalReprovar
                        onClose={fecharModalReprovar}
                        idPsicologo={psicologoSelecionado}

                    />
                </>
            )}


            {mostrarModalAprovar && (
                <>
                    <div className='modal-overlay'></div>
                    <ModalAprovar
                        onClose={fecharModalAprovar}
                        idPsicologo={psicologoSelecionado}

                    />
                </>
            )}
        </>
    );
}