import Estrela from "../../../../../../../assets/estrela.svg"
import EstrelaVazia from "../../../../../../../assets/estrela-vazia.svg"

export default function Estrelas({ nota, className="" }: { nota: number; className?: string }) {
    const notaInteira = Math.floor(nota); 
    const estrelasCheias = Array.from({ length: notaInteira });
    const estrelasVazias = Array.from({ length: 5 - notaInteira });

    return (
        <div className={`estrelas ${className}`}>
            {estrelasCheias.map((_, index) => (
                <img key={`cheia-${index}`} src={Estrela} alt="Estrela cheia" />
            ))}
            {estrelasVazias.map((_, index) => (
                <img key={`vazia-${index}`} src={EstrelaVazia} alt="Estrela vazia" />
            ))}
        </div>
    );
}