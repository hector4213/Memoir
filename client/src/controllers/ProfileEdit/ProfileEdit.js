import React, {useState} from 'react'
import './ProfileEdit.scss'

import {connect} from 'react-redux'
import {editProfileAction} from '../../redux/actions/db_put'

const ProfileEdit = props => {
    const {user, editProfile} = props
    const [profileForm, setProfileForm] = useState({
        username: user.username,
        email: user.email,
    })

    return (
        <div className='profile-edit'>
            Profile Edit
            <form>
                <input type='text' value={profileForm.username} onChange={ e => {
                    e.preventDefault()
                    setProfileForm({...profileForm, username: e.target.value})
                }}/>

                <input type='text'  value={profileForm.email} onChange={ e => {
                    e.preventDefault()
                    setProfileForm({...profileForm, email: e.target.value})
                }}/>

                <button onClick ={ e => {
                    e.preventDefault()
                    const final = {...user, ...profileForm}
                    console.log(final)
                    editProfile(final)
                }}> Submit </button>
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
    return {
        editProfile: profileInfo => dispatch(editProfileAction(profileInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)