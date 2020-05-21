import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = ( props ) => {
  console.log("In Build Controls props are: ", props.disabled)
  console.log("controls is: ", controls)
  return (
        <div className={classes.BuildControls}>
          <p>Current prince : <strong>{props.price}</strong></p>
          { controls.map(ctr => (
              <BuildControl 
                key={ctr.label} 
                label={ctr.label}
                added={()=> props.ingredientAdded(ctr.type)}
                removed={()=> props.ingredientRemoved(ctr.type)}
                disabled = {props.disabled[ctr.type]}/>
          ))}
          <button   
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick= {props.ordered}>ORDER NOW</button>
        </div>
  )
}

export default buildControls