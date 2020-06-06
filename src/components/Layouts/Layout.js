import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        sideMenuOpen: false
    }

    openSideMenuHandler = () =>{
        this.setState({sideMenuOpen:true})
    }

    closeSideMenuHandler = () =>{
        this.setState({sideMenuOpen:false})
    }

    render(){
        return(
        <React.Fragment>
            <SideDrawer 
                open={this.state.sideMenuOpen}
                close={this.closeSideMenuHandler}/>
            <Toolbar openSideMenu={this.openSideMenuHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </React.Fragment>
        );
    }
}

export default Layout;