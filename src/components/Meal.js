import React from 'react';
// import './Meal.css'

const Meal = ({name, id, quantity}) => {
    return (
        <div>
            <div className="fl w-80 pa2 bt bb b--near-white">{name}</div>
            <div className="fl w-20 pa2 bt bb b--near-white"><span className='f4'>qty</span> {quantity}</div>
        </div>
    )
}

export default Meal;