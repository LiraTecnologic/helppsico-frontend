import './InputMedio.css';

interface InputMediolProps {
    pleaceHolder: string;
    label: string;
    tipo: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    elemento: string;
}

function InputMedio({ pleaceHolder, label, tipo, value, onChange }: InputMediolProps) {
    return (
        <div className='contentMidInput'>
            <label className='textLabel'>{label}</label>
            <{elemento} type={tipo} placeholder={pleaceHolder} className='inputmid' value={value} onChange={onChange}/>
        </div>
    );
}

export default InputMedio;