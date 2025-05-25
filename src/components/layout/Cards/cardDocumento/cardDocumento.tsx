import DocPdf from '../../../../assets/doc-pdf.png'
import './cardDocumento.css';

interface CardDocumentoProps {
    isSelected: boolean,
    onSelect: () => void;
}

export default function CardDocumento({ isSelected, onSelect } : CardDocumentoProps) {
    return (
    <div
      className={`div-card-documento ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className='div-img-info-doc'>
        <img src={DocPdf} alt="Imagem documento pdf" />
        <p>ATESTADO</p>
      </div>

      <label className="custom-radio">
        <input
          type="radio"
          name="documento"
          checked={isSelected}
          onChange={() => {}} 
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
}