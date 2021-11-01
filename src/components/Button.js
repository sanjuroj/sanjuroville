import React, { Component } from 'react';
import classNames from 'classnames';


export default class Button extends Component {
    
    constructor(){
        super();
        this.setButtonState.bind(this);
    }

    componentWillMount(){
        this.setState({clicked: false});
    }

    setButtonState(newState){
        this.setState({clicked: newState});
    }

    handleClick(){
        this.setButtonState(true);
        this.props.dispatch(this.props.action(this.props.expandable));
    }

    render(){
        let classes = classNames(
            'control-button',
            {'selected' : this.state.clicked}
        );
        //className += state.active
        return (
            <span 
                type="button" 
                className={classes}
                onClick={this.handleClick.bind(this)}
            >
            {this.props.text}
            </span>
        );
    }

}