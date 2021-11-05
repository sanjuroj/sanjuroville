import React, { Component } from 'react';
import SimpleText from '../SimpleText';

export default class HighlightBox extends Component {
    
    makeHighlights(){
        if(this.props.highlights.length > 1){
            return this.props.highlights.map( (hLight, key) => {
                return (
                    <li className={'highlight'} key={key}>
                        <SimpleText text={hLight.highlight} />
                    </li>
                );

            });
        }
        else {
            return(<SimpleText text={this.props.highlights[0].highlight} />);
        }
    }
    
    render() {
        if (this.props.highlights !== undefined){
            return (
                <div className={'highlight-box'}>
                    <ul>
                        {this.makeHighlights()}
                    </ul>
                </div>
            );
        }
        else{
            return (null);
        }

    }

}


