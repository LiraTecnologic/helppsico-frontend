import DocPdf from '../../../../assets/doc-pdf.png'
import './cardDocumento.css';

interface CardDocumentoProps {
  isSelected: boolean,
  onSelect: () => void,
  nome: string;
}

export default function CardDocumento({ isSelected, onSelect, nome }: CardDocumentoProps) {
  return (
    <div
      className={`div-card-documento ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className='div-img-info-doc'>
        <img src={DocPdf} alt="Imagem documento pdf" />
        <p>{nome}</p>
      </div>

      <label className="custom-radio">
        <input
          type="checkbox" 
          checked={isSelected}
          onChange={onSelect} 
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
}