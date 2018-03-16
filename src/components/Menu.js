import React from 'react';
import Meal from './Meal';
import './Menu.css';

const Menu = ({ meals }) => {
    return (
        <div className='grid-container bg-green white'>
            {
                meals.map((meal, i) => {
                    return (
                        <Meal
                            key={meals[i].id}
                            name={meals[i].name}
                        />
                    );
                })
            }
        </div>
    );
}

export default Menu;