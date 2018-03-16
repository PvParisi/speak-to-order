import React from 'react';
import './Meal.css'

const Meal = ({name, id}) => {
    return (
        <div>
            <div className="fl w-80 pa2 bb b--near-white">{name}</div>
            <div className="fl w-20 pa2 bb b--near-white"><input value="0"></input></div>
        </div>
    )
}

export default Meal;