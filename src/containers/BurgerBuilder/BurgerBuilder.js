import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.8,
    meat: 1.3,
    bacon: 0.5
}


class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 2.5,
        purchasable: false,
        purchasing: false
    }

    addIngredientHandler = (type) => {        
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice =  this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type)  => {
        const oldCount = this.state.ingredients[type];

        if(oldCount === 0) { return }
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice =  this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) => {        
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            } ,0);
        this.setState({purchasable: sum > 0})
    }

    purchaseHandler =() => {
        this.setState({purchasing:true});
    }

    cancelPurchaseHandler = () => {        
        this.setState({purchasing:false});
    }

    continuePurchaseHandler = () => {
        //console.log("Purchase yummy burger");
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max Schwarz',
                address: {
                    street: "test stree",
                    zipcode: "122324",
                    country: "USA"
                },
                email: "test@test.com"
            },
            deliveryMethod: "fastest"
        }
        axios.post('/orders.json',order)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }

    render () {
        return ( 
            <React.Fragment>
                <Modal 
                    show={this.state.purchasing} 
                    ModalClose={this.cancelPurchaseHandler}
                    >
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        proceed={this.continuePurchaseHandler}
                        cancel={this.cancelPurchaseHandler}
                        price={this.state.totalPrice}
                        />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>                
                <BuildControls 
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}    
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;