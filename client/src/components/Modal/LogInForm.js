import React, {useState} from 'react'
import Button from '../Button/Button'

const LogInForm = props => {
    const [formInfo, setFormInfo] = useState()

    return (
        <form>

            <input type='text' placeholder='Enter your Username'
                onChange={ e =>{
                setFormInfo( {...formInfo, username : e.target.value })
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
                onClick: e => {
                    e.preventDefault()
                    console.log(formInfo)
                }
            }}/>
        </form>
    )
}

export default LogInForm