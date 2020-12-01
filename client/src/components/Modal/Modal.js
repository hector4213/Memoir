import React, {useState} from 'react'
import './Modal.scss'

import {connect} from 'react-redux'

import RegisterForm from './RegisterForm'
import LogInForm from './LogInForm'

import {clearErrorAction} from '../../redux/actions/profile'

const Modal = props => {
    const [registerTab, isRegisterTab] = useState(true)
    const {error} = props
    const {toggleModal, clearError} = props

    return (
        <div className='modal' onClick={()=>{
            toggleModal()
            clearError()
        }}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
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
                {error? <div className='error'> {error} </div>:''}
            </div>
        </div>
    )
}

const mapStateToProps = state =>{
    return {
        error: state.profile.error
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        clearError: () => dispatch(clearErrorAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)