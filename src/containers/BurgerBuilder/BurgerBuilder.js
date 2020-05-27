import React, { Component } from 'react'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 100,
    cheese: 200,
    meat: 1200,
    bacon: 500
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        // ingredients : {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        totalPrice: 100,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount () {
        axios.get('https://react-burger-278415.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                console.log("error to get: ", error)
                this.setState({error: true})

            })
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    updatePurchaseState = ( ingredients ) => {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey]
            }).reduce((sum, elt) => {
                return sum + elt
            }, 0)
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
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
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        //alert('You continue')
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Lynda Bounif',
                address: 'Hussein day',
                city: 'Algiers'
            },
            email: 'l_bounif@esi.dz',
            deliveryMethod: 'fastest'

        }
        axios.post('/orders.json', order)
            .then(response => {
                //console.log(response)
                this.setState({ loading: false, purchasing: false })
            })
            .catch(error => {
                this.setState({ loading: true, purchasing: false })
            })
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        //let burger = <Spinner />
        let burger = this.state.error ? <p>Ingredients can't be loaded </p> : <Spinner />
        
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}></Burger>
                    <BuildControls 
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled = {disabledInfo}
                        purchasable = {this.state.purchasable}
                        price = {this.state.totalPrice}
                        ordered = {this.purchaseHandler}/>
                </Aux>
            )
                orderSummary = <OrderSummary 
                    ingredients = {this.state.ingredients}
                    price = {this.state.totalPrice}
                    purchaseCancelled = {this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinueHandler}/>
        }
        if( this.state.loading ){
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )

    }
}

export default withErrorHandler(BurgerBuilder, axios)