import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Meat', type: 'meat'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Bacon', type: 'bacon'},
]

const BuildControls = (props) => {
    return(
    <div className={classes.BuildControls}>
        <p><b>Price : </b>{props.price.toFixed(2)}</p>
        {controls.map((control) => ( 
            <BuildControl 
                key={control.label} 
                label={control.label}                 
                added={() => props.ingredientAdded(control.type)}
                removed={() => props.ingredientRemoved(control.type)}
            /> ))}        
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
            >
            ORDER NOW
        </button>
    </div>
    )
}

export default BuildControls;




