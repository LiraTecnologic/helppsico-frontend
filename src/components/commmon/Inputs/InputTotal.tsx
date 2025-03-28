import './InputTotal.css';

interface InputTotalProps {
    pleaceHolder: string;
    label: string;
    tipo: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputTotal({ pleaceHolder, label, tipo, value, onChange }: InputTotalProps) {
    return (
        <div className='contentFullInput'>
            <label className='textLabel'>{label}</label>
            <input 
                type={tipo} 
                placeholder={pleaceHolder} 
                className='inputFull' 
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default InputTotal;
