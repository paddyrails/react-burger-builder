import React from 'react';
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((ingKey) => {
        return <li key={ingKey}>{ingKey}:{ props.ingredients[ingKey] }</li>
        })
    return(
    <React.Fragment>
        <h3>Your Order</h3>
        <p>Delicious Burger with following ingredients: </p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Price: </strong>{props.price.toFixed(2)}</p>        
        <p>Continue to checkout?</p>        
        <Button clicked={props.proceed} btnType="Danger">CONTINUE</Button>
        <Button clicked={props.cancel} btnType="Success">CANCEL</Button>
    </React.Fragment>
    )
};

export default OrderSummary;