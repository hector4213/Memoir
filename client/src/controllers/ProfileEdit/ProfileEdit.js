import React from 'react'
import './ProfileEdit.scss'

import {connect} from 'react-redux'

const ProfileEdit = props => {

    const {user} = props

    console.log(user)

    return (
        <div className='profile-edit'>
            Profile Edit
            <form>
                <input value={user.username} onChange={()=>{}}/>
                <input value={user.email} onChange={()=>{}}/>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.profile.user
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)