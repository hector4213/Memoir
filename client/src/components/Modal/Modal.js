import React from 'react'
import './Modal.scss'

const Modal = props => {
    const {showModal} = props

    return (
        <div className='modal' onClick={()=>showModal(false)}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                This is a modal
            </div>
        </div>
    )
}

export default Modal