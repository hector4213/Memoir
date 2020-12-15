import React, {useState} from 'react'
import './FormStyle.scss'
import Button from '../Button/Button'

const LogInForm = props => {
    const [formInfo, setFormInfo] = useState()
    const {logIn} = props

    const loginRequest = e => {
        e.preventDefault()
        logIn(formInfo)
    }

    return (
        <form>
            <input type='text' name='email' placeholder='Enter your E-mail'
                onChange={ e =>{
                    setFormInfo( {...formInfo, email : e.target.value })
                }}
            />

            <input type='password' name='password' placeholder='Enter your Password'
                onChange={ e =>{
                    setFormInfo( {...formInfo, password : e.target.value })
                }}
            />

            <Button {...{
                label:'Submit',
                extraClass:'submit-login',
                transparent: false,
                onClick: loginRequest
            }}/>
        </form>
    )
}

export default LogInForm