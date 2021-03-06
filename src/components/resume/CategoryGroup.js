import React, { Component } from 'react';
import ResumeItemGroup from './ResumeItemGroup';

export default class CategoryGroup extends Component {

    makeRIGItems() {
        return this.props.data.map(function(item, key){
        
            return (
                <ResumeItemGroup 
                    key={key} 
                    {...item} 
                    dispatch={this.props.dispatch} 
                    highlightTracker={this.props.highlightTracker} 
                    className="title-card"
                    groupFlag={this.props.groupFlag}
                />
            );
            
        }, this);
        
    }
    

    render() {
        return (
            <div className={'category-group'}>
                <div id="category-title">
                    <p className={'category-title'}>{this.props.category_title.toUpperCase()}</p>
                </div>
                <div 
                    id={this.props.groupFlag == false ? "timeline" : null }
                    className="category-container"
                > 
                        {this.makeRIGItems()}
                </div>
            </div>
        );
        
    }

}