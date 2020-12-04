import React,{useState} from 'react'
import './LogInRegister.scss'

import {connect} from 'react-redux'

import RegisterForm from './RegisterForm'
import LogInForm from './LogInForm'

import {clearErrorAction} from '../../redux/actions/profile'

const LogInRegisterModal = props => {
    const [registerTab, isRegisterTab] = useState(true)
    const {clearError} = props

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

            {registerTab? <RegisterForm /> : <LogInForm />}
        </>
    )
}

const mapStateToProps = state =>{
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        clearError: () => dispatch(clearErrorAction())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogInRegisterModal)