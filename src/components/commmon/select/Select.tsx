import React from 'react';
import './select.css';

const Select = ({ label, value, onChange, options }) => {
    return (
        <div className="input-wrapper">
            <label>{label}</label>
            <select value={value} onChange={onChange} className="select">
                <option value="">Selecione...</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Select;
