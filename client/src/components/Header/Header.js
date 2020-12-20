import React, {useRef, useState} from 'react'
import './Header.scss'

const Header = props => {
    const [topPos, setTopPos] = useState()
    const [leftPos, setLeftPos] = useState()
    const [scaleAmount, setScaleAmount] = useState()
    const logo = useRef(null)

    const followMouse = e => {
        setTopPos(`${e.clientY-50}px`) //e.pageY
        setLeftPos(`${e.clientX - 200}px`) //e.pageX
    }

    const mouseOut = () =>{
        setTopPos('50%')
        setLeftPos('50%')
    }

    const grow = () => setScaleAmount(1.5)
    const finishGrow = () => setScaleAmount(1)

    const logoStyle = {top:topPos, left:leftPos, transform: `scale(${scaleAmount})` }

return(
    <div className='header'>
        <div
            className='title'
            onMouseMove={followMouse}
            onMouseOut={mouseOut}
        >
            <h1>Memoir</h1>
            <p
                onMouseMove={grow}
                onMouseOut={finishGrow}
            >
                Discover someone’s story. <br/>
                Share yours.
            </p>
        </div>

        <div className='logo' ref={logo} style={logoStyle}/>
    </div>
)
}

export default Header