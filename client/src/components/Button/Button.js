import React from 'react'
import './Button.scss'

const Button = props => {

    const { label, onClick, transparent, extraClass } = props;

    let btnClass = transparent? 'transparent-btn' : 'solid-btn'
    btnClass += extraClass? ` ${extraClass}` : '';

    return (
        <button
            className={btnClass}
            onClick={onClick}
        >
            {label ? label : 'hello'}
        </button>
    )
}

export default  Button