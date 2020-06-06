import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show
    }

    componentWillUpdate(){
        console.log("[MOdal] will update");
    }

    render(){
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.ModalClose}/>
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal;