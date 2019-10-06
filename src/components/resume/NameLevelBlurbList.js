import React, { Component } from 'react';

export default class NameLevelBlurbList extends Component {
    
    makeList(){
        return(this.props.data.map( (item, key) => {
            
            let summary = '';
            if (item.summary) {
                summary = " - " + item.summary;
            }

            return (
                <li key={key}> 
                    <span className="nlb-name">{item.name} </span>
                    ({item.level}){summary}
                </li>
            );

        }));
    }


    render() {
        //console.log('nlbl props', this.props)
        return (
            <div>
                <p className="category-title">{this.props.heading}</p>
                {this.props.subtitle !== 'undefined' ? (
                        <div className="category-subtitle">{this.props.subtitle}</div>
                    ) : none
                }
                <div className="category-container">
                    <ul>
                        {this.makeList()}
                    </ul>
                </div>
            </div>
        );
    
    }

}
