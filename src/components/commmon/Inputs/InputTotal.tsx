import './InputTotal.css';

interface InputTotalProps {
    pleaceHolder: string;
    label: string;
}

function InputTotal(props: InputTotalProps) {
    return (
        <div className='contentFullInput'>
            <label className='textLabel'>{props.label}</label>
            <input type="text" placeholder={props.pleaceHolder} className='inputFull'/>
        </div>
    );
}

export default InputTotal;