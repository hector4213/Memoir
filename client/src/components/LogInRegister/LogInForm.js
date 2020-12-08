import React, {useState} from 'react'
import Button from '../Button/Button'

import {connect} from 'react-redux'
import {logInAction} from '../../redux/actions/profile'


const LogInForm = props => {
    const [formInfo, setFormInfo] = useState()
    const {logIn} = props

    const loginRequest = e => {
        e.preventDefault()
        logIn(formInfo)
    }

    return (
        <form>
            <input type='text' placeholder='Enter your E-mail'
                onChange={ e =>{
                    setFormInfo( {...formInfo, email : e.target.value })
                }}
            />

            <input type='password' placeholder='Enter your Password'
                onChange={ e =>{
                    setFormInfo( {...formInfo, password : e.target.value })
                }}
            />

            <Button {...{
                label:'Submit',
                transparent: false,
                onClick: loginRequest
            }}/>
        </form>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: profile => dispatch(logInAction(profile))
    }
}

export default connect(null, mapDispatchToProps)(LogInForm)