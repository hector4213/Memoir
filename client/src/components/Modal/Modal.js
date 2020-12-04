import React from 'react'
import './Modal.scss'

import {connect} from 'react-redux'
import {toggleModalAction} from '../../redux/actions/page'
import {clearErrorAction} from '../../redux/actions/profile'

const Modal = props => {
    const {toggleModal, clearError, error} = props

    return (
        <div className='modal' onClick={()=>{
            toggleModal()
            clearError()
        }}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                {props.children}
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
        toggleModal: () => dispatch(toggleModalAction()),
        clearError: () => dispatch(clearErrorAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)