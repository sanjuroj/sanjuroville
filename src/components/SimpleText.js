import React, { Component } from 'react';


export default class Summary extends Component {
    
    
    render() {
        return (
            <div className={this.props.divClasses}>
                <span className={this.props.spanClasses}>
                    {this.props.text}
                </span>
            </div>
        );
    }

}


