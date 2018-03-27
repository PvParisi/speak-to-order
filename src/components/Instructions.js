import React from 'react';
import './Instructions.css';
// import leftArrowImage from '../img/arrow-left.png';

const Instructions = () => {
    return (
        <div id='instructions'>
            {/* <img src={leftArrowImage} alt={'arrow left'} /> */}
            <p><i className='fas fa-hand-point-down'></i> Tell me what you would like, I'm listening</p>
        </div>
    )
}

export default Instructions;