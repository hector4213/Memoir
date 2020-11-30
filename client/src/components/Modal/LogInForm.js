import React, {useState} from 'react'
import Button from '../Button/Button'

import axios from 'axios'

const LogInForm = props => {
    const [formInfo, setFormInfo] = useState()

    const loginRequest = async e => {
        e.preventDefault()

        try{
            const log = await axios.post('http://localhost:3001/api/auth/login', formInfo)
            console.log(log)
        }
        catch(error){
            console.log(error.response.data.error)
            console.log(error)
        }
    }

    return (
        <form>

            <input type='text' placeholder='Enter your E-mail'
                onChange={ e =>{
                    setFormInfo( {...formInfo, email : e.target.value })
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
                onClick: loginRequest
            }}/>
        </form>
    )
}

export default LogInForm