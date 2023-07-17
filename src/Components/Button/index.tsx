import React from 'react'
import './styles.css';
import { ButtonPropType } from './types';

const Button = ({ label, logo, className, logoClass, lableClass, onClick, disabled }: ButtonPropType) => {
    return (
        <div className={`btn ${className} ${disabled ? 'disabled' : ''}`} onClick={!disabled ? onClick : undefined}>
            <div className='btnContainer'>
                {logo && <div className={logoClass ? logoClass : 'btnLogo'}>{logo}</div>}
                <span className={`${lableClass} ${disabled ? 'disabledSpan' : ''}`}>{label}</span></div>
        </div>
    )
}

export default Button;
