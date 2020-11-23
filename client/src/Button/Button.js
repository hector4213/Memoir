import React from 'react'
import './Button.css'

export const palindrome = (string) => {
    return string
            .split('')
            .reverse()
            .join('')
}

const Button = ({ primary, label, backgroundColor, onClick }) =>{
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