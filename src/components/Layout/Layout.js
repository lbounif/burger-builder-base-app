import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'


class Layout extends Component{
    state = {
        showSidedrawer:true
    }

    sideDrawerClosedHandler= () =>{
        this.setState({showSidedrawer:false})
    }
    sideDrawerToggleHandler= () =>{
        this.setState((prevState)=>{
            return {showSidedrawer:!prevState.showSidedrawer}
        })
    }
    render(){
        return(
            <Aux>
                {/* <div>Toolbar, SideDrawer, BackDrop</div> */}
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSidedrawer}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
} 


export default Layout;