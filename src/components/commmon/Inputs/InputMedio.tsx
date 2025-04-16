import './InputMedio.css';

interface InputMedioProps {
    pleaceHolder: string;
    label: string;
    tipo: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

function InputMedio({ pleaceHolder, label, tipo, value, onChange, onBlur, disabled = false }: InputMedioProps) {
    return (
        <div className='contentMidInput'>
            <label className='textLabel'>{label}</label>
            <input 
                type={tipo} 
                placeholder={pleaceHolder} 
                className='inputmid' 
                value={value} 
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
            />
        </div>
    );
}

export default InputMedio;