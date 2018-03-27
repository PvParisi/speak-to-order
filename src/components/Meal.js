import React from 'react';
// import './Meal.css'

const Meal = ({name, id, quantity, description, imgUrl}) => {
    return (
        <div className='bt bb b--near-white'>
            <div className="fl w-20 pa2">
                <img className='br3 shadow-3' src={imgUrl} alt='meal' />
            </div>
            <div className="fl w-60 pa2">
                <h6>{name}</h6>
                <p>{description}</p>
            </div>
            <div className="fl w-20 pa2"><span className='f4'>qty</span> {quantity}</div>
        </div>
    )
}

export default Meal;