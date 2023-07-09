import React from 'react'
import './styles.css';

const TextField = ({ placeholder, type='text', icon, ...rest }: any) => {
    return (
        <div className='inputDiv'>
            <input placeholder={placeholder} type={type} {...rest} />
            {icon?.()}
        </div>
    )
}

export default TextField;