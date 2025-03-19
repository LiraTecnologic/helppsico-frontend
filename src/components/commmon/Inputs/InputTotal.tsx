import './InputTotal.css';

interface InputTotalProps {
    pleaceHolder: string;
    label: string;
}

function InputTotal(props: InputTotalProps) {
    return (
        <div className="input-container">
            <label className="input-label">
                {props.label}<br/>
            </label>
            <input className="input-field" type="text" value={props.pleaceHolder} />
        </div>
    );
}

export default InputTotal;