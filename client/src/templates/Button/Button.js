import React from 'react'
import './Button.scss'

const Button = props => {

    const { label, onClick, transparent, extraClass, red, green } = props;

    let btnClass = transparent? 'transparent-btn ' : 'solid-btn '
    btnClass += extraClass? `${extraClass} ` : '';
    btnClass += red? `delete ` : '';
    btnClass += green? `go ` : '';

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