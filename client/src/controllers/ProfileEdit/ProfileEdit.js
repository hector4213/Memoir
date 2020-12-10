import React, {useState} from 'react'
import './ProfileEdit.scss'

import {connect} from 'react-redux'
import {editProfileAction} from '../../redux/actions/db_put'
import Button from '../../components/Button/Button'

const ProfileEdit = props => {
    const {user, editProfile} = props
    const [profileForm, setProfileForm] = useState({
        username: user.username,
        email: user.email,
    })

    return (
        <div className='profile-edit'>
            <h1>Profile Edit</h1>
            <form>
                <input type='text' value={profileForm.username} onChange={ e => {
                    e.preventDefault()
                    setProfileForm({...profileForm, username: e.target.value})
                }}/>

                <input type='text'  value={profileForm.email} onChange={ e => {
                    e.preventDefault()
                    setProfileForm({...profileForm, email: e.target.value})
                }}/>

                <div className='profile-edit-buttons'>
                    <Button {...{
                        label: 'Delete Profile',
                        onClick: e => {
                            e.preventDefault()
                            const final = {...user, ...profileForm}
                            console.log(final)
                            editProfile(final)
                        },
                        transparent: true,
                        extraClass: 'delete-profile'
                    }} />

                    <Button {...{
                        label: 'Submit',
                        onClick: e => {
                            e.preventDefault()
                            const final = {...user, ...profileForm}
                            console.log(final)
                            editProfile(final)
                        },
                        transparent: false,
                        // extraClass
                    }} />
                </div>

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