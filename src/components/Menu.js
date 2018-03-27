import React from 'react';
import Meal from './Meal';
import './Menu.css';

const Menu = ({ meals, foundIndex, quantity }) => {
    console.log(foundIndex);
    return (
        <div className='grid-container ba b--silver'>
                <div className='spacer'></div>
                {
                    meals.map((meal, i) => {
                        console.log(i);

                        if (i === foundIndex && quantity === 0) {
                                return (
                                    <div className='bg-lightest-blue'>
                                        <Meal
                                            key={meals[i].id}
                                            name={meals[i].name}
                                            quantity={quantity}
                                        />
                                    </div>
                                );
                        }

                        if (i === foundIndex && quantity > 0) {
                            return (
                                <div className='bg-light-green'>
                                    <Meal
                                        key={meals[i].id}
                                        name={meals[i].name}
                                        quantity={quantity}
                                    />
                                </div>
                            );
                        }

                        return (
                            <Meal
                                key={meals[i].id}
                                name={meals[i].name}
                                quantity={0}
                            />
                        );
                    })
                }
                <div className='spacer'></div>
            </div>
    );
}

export default Menu;