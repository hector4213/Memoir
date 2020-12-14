import React,{useState} from 'react'
import './LogInRegister.scss'

import {connect} from 'react-redux'

import RegisterForm from '../../templates/RegisterForm/RegisterForm'
import {registerUserAction} from '../../redux/actions/register'

import LogInForm from '../../templates/LogInForm/LogInForm'
import {logInAction} from '../../redux/actions/logInOut'

import {clearErrorAction} from '../../redux/actions/page'

const LogInRegisterModal = props => {
    const [registerTab, isRegisterTab] = useState(true)
    const {clearError, logIn, registerUser} = props

    return (
        <>
            <div className='modalTabs'>
                <button
                    className={registerTab? 'active' : '' }
                    onClick={()=>{
                        clearError()
                        isRegisterTab(true)
                    }}
                >
                Register </button>

                <button
                    className={registerTab? '' : 'active' }
                    onClick={()=>{
                        clearError()
                        isRegisterTab(false)
                    }}
                >
                Log In </button>
            </div>

            {
            registerTab?
            <RegisterForm {...{registerUser}} /> 
            :
            <LogInForm {...{logIn}} />
            }
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: profile => dispatch(logInAction(profile)),
        registerUser: formInfo => dispatch(registerUserAction(formInfo)),
        clearError: () => dispatch(clearErrorAction()),
    }
}
export default connect(null, mapDispatchToProps)(LogInRegisterModal)