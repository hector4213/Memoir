import React, {useState} from 'react'
import Button from '../Button/Button'
// label, onClick, transparent, extraClass

const RegisterForm = props => {
    const [formInfo, setFormInfo] = useState()

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
                onClick: e => {
                    e.preventDefault()
                    console.log(formInfo)
                }
            }}/>
        </form>
    )
}

export default RegisterForm