import React from 'react'
import './Button.scss'

const Button = props => {

    const { label, onClick, transparent, extraClass, red, green, icon } = props;

    let btnClass = transparent? 'transparent-btn ' : 'solid-btn '
    btnClass += extraClass? `${extraClass} ` : '';
    btnClass += red? `delete ` : '';
    btnClass += green? `go ` : '';

    return (
        <button
            className={btnClass}
            onClick={onClick}
        >
            {icon? icon : ''}
            {label ? label : 'hello'}
        </button>
    )
}

export default  Button