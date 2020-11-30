import React, {useState} from 'react'
import Button from '../Button/Button'
// label, onClick, transparent, extraClass

import axios from 'axios'

const RegisterForm = props => {
    const [formInfo, setFormInfo] = useState()

    const registerRequest = async e => {
        e.preventDefault()

        if(formInfo.password === formInfo.confirmPassword){

            delete formInfo.confirmPassword

            const sign = await axios.post('http://localhost:3001/api/auth/signup', formInfo)

            console.log('signup: ')
            console.log(sign)
        }
    }

    return (
        <form>

            <input type='text' placeholder='Enter your Username'
                onChange={ e =>{
                setFormInfo( {...formInfo, username : e.target.value })
                }}
            />

            <input type='email' placeholder='Enter your E-mail'
                onChange={ e =>{
                setFormInfo( {...formInfo, email : e.target.value })
                }}
            />

            <input type='password' placeholder='Enter your Password'
                onChange={ e =>{
                    setFormInfo( {...formInfo, password : e.target.value })
                }}
            />

            <input type='password' placeholder='Re-enter your Password'
                onChange={ e =>{
                    setFormInfo( {...formInfo, confirmPassword : e.target.value })
                }}
            />

            <Button {...{
                label:'Submit',
                transparent: false,
                onClick: registerRequest
            }}/>
        </form>
    )
}

export default RegisterForm