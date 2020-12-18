import React, {useRef, useState} from 'react'
import './Header.scss'

const Header = props => {
    const [topPos, setTopPos] = useState()
    const [leftPos, setLeftPos] = useState()
    const logo = useRef(null)

    const followMouse = e => {
        setTopPos(`${e.clientY - 50}px`) //e.pageY
        setLeftPos(`${e.clientX - 250}px`) //e.pageX
    }

    const mouseOut = () =>{
        setTopPos('50%')
        setLeftPos('50%')
    }

    const logoStyle = {top:topPos, left:leftPos }

return(
    <div className='header' onMouseMove={followMouse} onMouseOut={mouseOut}>
        <div className='title'>
            <h1>Memoir</h1>
            <p>
                Discover someone’s story
            </p>
        </div>

        <div className='logo' ref={logo} style={logoStyle}/>
    </div>
)
}

export default Header