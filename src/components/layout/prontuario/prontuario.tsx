import './prontuario.css';

interface ProntuarioProps {
    nomePaciente: string;
    dataAdicionado: string;
    tamanhoArquivo: string;
    onClickAbrir?: () => void;
}



// function Prontuario({ 
//     nomePaciente, 
//     dataAdicionado, 
//     tamanhoArquivo, 
//     onClickAbrir,
//     className = ''
// }: ProntuarioProps) {
//     return (
//         <div className={`prontuarioContainer ${className}`}>
//             <h1 className='prontuarioNomePaciente'>{nomePaciente}</h1>

//             <div className='prontuarioDetalhes'>
//                 <p>
//                     <strong>Nome Paciente Pront...</strong>
//                     <br />
//                     Adicionado em {dataAdicionado}
//                     <br />
//                     {tamanhoArquivo}
//                 </p>
//             </div>

//             <button 
//                 className='prontuarioBotaoAbrir' 
//                 onClick={onClickAbrir}
//             >
//                 Abrir Arquivo
//             </button>
//         </div>
//     );
// }

// export default Prontuario;