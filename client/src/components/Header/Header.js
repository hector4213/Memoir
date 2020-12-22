import React, {useRef, useState} from 'react'
import './Header.scss'

const Header = props => {
    const [logoStyle, setLogoStyle] = useState()
    const logo = useRef(null)

    const followMouse = e => {
        setLogoStyle({
            top:`${e.clientY}px`,
            left:`${e.clientX}px`,
            transform: `scale(1)`,
            position:'fixed'
        })
    }

    const mouseOut = () =>{
        setLogoStyle({
            top: '50%',
            left: '50%',
            transform: `scale(1.5)`,
            position:'absolute'
        })
    }

return(
    <div className='header'>
        <div
            className='title'
            onMouseMove={followMouse}
            onMouseOut={mouseOut}
        >
            <h1>Memoir</h1>
            <p>
                Discover a story. <br/>
                Share yours.
            </p>
        </div>

        <div className='logo' ref={logo} style={logoStyle}/>
    </div>
)
}

export default Header