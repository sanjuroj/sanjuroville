import React, { Component } from 'react';
import { toggle_grouped, expand_all, compress_all } from '../../actions/';
import Button from '../Button';


export default class ControlBar extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange() {
        this.props.dispatch(toggle_grouped());
        
    }

    render() {
        return (
            <div className="control-bar">
                <div className="grouped-switch">
                    <div className="grouped-label">
                        Chronological
                    </div>
                    <div className="switch">
                        <input 
                            id="cmn-toggle-1" 
                            className="cmn-toggle cmn-toggle-round" 
                            type="checkbox" 
                            checked={this.props.groupFlag}
                            onChange={this.handleChange}
                        />
                        <label htmlFor="cmn-toggle-1"></label>
                    </div>
                    <div className="grouped-label">
                        Grouped
                    </div>
                </div>
                <div id="control-button-group">
                    <Button 
                        expandable={this.props.expandable} 
                        action={expand_all} 
                        text="Expand All" 
                        dispatch={this.props.dispatch}/>
                    <Button 
                        expandable={this.props.expandable} 
                        action={compress_all} 
                        text="Collapse All"
                        dispatch={this.props.dispatch}/>
                </div>
            </div>
          
        );
    }
}
