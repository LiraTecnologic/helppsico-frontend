import DocPdf from '../../../../assets/doc-pdf.png'
import './cardDocumento.css';

export default function CardDocumento() {
    return (
        <div className='div-card-documento'>
            <div className='div-img-info-doc'>
                <img src={DocPdf} alt="Imagem documento pdf" />
                <p>ATESTADO</p>
            </div>

            <label className="custom-radio">
                <input type="radio" name="documento" />
                <span className="checkmark"></span>
            </label>
        </div>
    );
}