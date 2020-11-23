import React from 'react'
import './Button.css'

export const palindrome = (string) => {
    return string
            .split('')
            .reverse()
            .join('')
}

const Button = props => {
    const { primary, label, backgroundColor, onClick } = props;

    const classes = primary? 'outline' : 'none'
    const style = {background: backgroundColor}

    return (
        <button
            className={classes}
            style={style}
            onClick={onClick}
        >{label ? label : 'hello'}</button>
    )
}

export default  Button