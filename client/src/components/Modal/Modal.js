import React, {useState} from 'react'
import './Modal.scss'

import RegisterForm from './RegisterForm'
import LogInForm from './LogInForm'

const Modal = props => {
    const [registerTab, isRegisterTab] = useState(true)
    const {showModal} = props

    return (
        <div className='modal' onClick={()=>showModal(false)}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='tabs'>
                    <button
                        className={registerTab? 'active' : '' }
                        onClick={()=>isRegisterTab(true)}
                    >
                    Register </button>

                    <button
                        className={registerTab? '' : 'active' }
                        onClick={()=>isRegisterTab(false)}
                    >
                    Log In </button>
                </div>

                {registerTab? <RegisterForm /> : <LogInForm />}
            </div>
        </div>
    )
}

export default Modal