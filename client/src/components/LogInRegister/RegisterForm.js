import React, {useState} from 'react'
import {connect} from 'react-redux'
import Button from '../Button/Button'

import {registerUserAction} from '../../redux/actions/profile'

const RegisterForm = props => {
    const [formInfo, setFormInfo] = useState()
    const {registerUser} = props

    const registerRequest = async e => {
        e.preventDefault()
        registerUser(formInfo)
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

const mapDispatchToProps = dispatch => {
    return {
        registerUser: formInfo => dispatch(registerUserAction(formInfo))
    }
}

export default connect(null, mapDispatchToProps)(RegisterForm)