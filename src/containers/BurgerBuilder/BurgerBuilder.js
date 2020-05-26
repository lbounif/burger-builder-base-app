import React, { Component } from 'react'

import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 100,
    cheese: 200,
    meat: 1200,
    bacon: 500
}

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 100,
        purshasble: false,
        purshasing: false
    }

    purchaseHandler = () => {
        this.setState({purshasing: true})
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, elt) => {
                return sum + elt
            }, 0)
        this.setState({purshasble: sum > 0})
    }

    addIngredientHandler = (type) => {
        //console.log("type is: ", type)
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        //console.log("updatedIngredients are: ", updatedIngredients)
        //console.log("new price is: ", newPrice)
        this.setState({ingredients:updatedIngredients, totalPrice:newPrice})
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        //console.log("type is: ", type)
        const oldCount = this.state.ingredients[type]
        if(oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        //console.log("updatedIngredients are: ", updatedIngredients)
        //console.log("new price is: ", newPrice)
        this.setState({ingredients:updatedIngredients, totalPrice:newPrice})
        this.updatePurchaseState(updatedIngredients)
    }
    purchaseCancelHandler = () => {
        this.setState({purshasing: false})
    }

    purchaseContinueHandler = () => {
        alert('You continue')
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //console.log("disabledInfo: ", disabledInfo)
        //salad: false, bacon: false, cheese: false, meat: false
        return (
            <Aux>
                <Modal 
                    show={this.state.purshasing}
                    modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients = {this.state.ingredients}
                        price = {this.state.totalPrice}
                        purshaseCancelled = {this.purchaseCancelHandler}
                        purshaseContinued = {this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}></Burger>
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purshasble}
                    price = {this.state.totalPrice}
                    ordered = {this.purchaseHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder