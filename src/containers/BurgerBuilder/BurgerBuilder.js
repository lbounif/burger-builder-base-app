import React, { Component } from 'react'

import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 100,
    cheese: 200,
    meat: 1200,
    bacon: 500
}

class BurgerBuilder extends Component {
    // constructor (props) {
    //     super(props)
    // }
    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 100
    }
    addIngredientHandler = (type) => {
        console.log("type is: ", type)
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        console.log("updatedIngredients are: ", updatedIngredients)
        console.log("new price is: ", newPrice)
        this.setState({ingredients:updatedIngredients, totalPrice:newPrice})
    }

    removeIngredientHandler = (type) => {
        
    }

    render () {
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients}></Burger>
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder