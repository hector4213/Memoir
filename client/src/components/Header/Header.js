import React from 'react'
import './Header.scss'

const Header = props => {
return(
    <div className='header'>
        <div className='logo'>
            <div className='title'>
                <h1>Memoir</h1>
                <p>
                    Learn someone’s story <br/>
                    Increase your motivation and empathy
                </p>
            </div>
        </div>
    </div>
)
}

export default Header