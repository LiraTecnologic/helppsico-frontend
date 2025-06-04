import './blocoHorario.css';

interface BlocoHorarioProps {
    hasConfig: boolean;
}

export default function BlocoHorario({ hasConfig }: BlocoHorarioProps) {
    return (
        <div className="container-cadHoraio">
            <div className="cadHorario-card">
                {hasConfig ? (
                    <>
                        <h1 className='tittle-cadHorario'>Configure agora seu horario para a proxima semana</h1>
                        <button className='botao-horarioCad'>Configure</button>
                    </>
                ) : (
                    <>
                        <h1 className='tittle-cadHorario'>Ainda não tem horario cadastrado?</h1>
                        <h2 className='subtittle-cadHorario'>Cadastre Agora</h2>
                        <button className='botao-horarioCad'>Cadastre</button>
                    </>
                )}
            </div>
        </div>
    )
}