import React from 'react';
import './select.css';

interface SelectProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}

const Select = ({ label, value, onChange, options }: SelectProps) => {
    return (
        <div className="input-wrapper">
            <label className="textLabel">{label}</label>
            <select value={value} onChange={onChange} className="select">
                <option value="">Selecione...</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
