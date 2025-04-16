import './InputTotal.css';

interface InputTotalProps {
    pleaceHolder: string;
    label: string;
    tipo: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

function InputTotal({ pleaceHolder, label, tipo, value, onChange, onBlur, disabled = false }: InputTotalProps) {
    return (
        <div className='contentFullInput'>
            <label className='textLabel'>{label}</label>
            <input 
                type={tipo} 
                placeholder={pleaceHolder} 
                className='inputFull' 
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
            />
        </div>
    );
}

export default InputTotal;