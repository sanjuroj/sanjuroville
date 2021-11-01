import React, { Component } from 'react';
import SimpleText from '../SimpleText';
import { HIGHLIGHTS } from '../../actions/';
import ReactMarkdown from 'react-markdown';

export default class TitleCard extends Component {

    clickAction(e) {
        let re = new RegExp("http");
        if (!re.test(e.target)) {
            this.props.dispatch({
                type: HIGHLIGHTS,
                title: this.props.title + this.props.organization
            });
        }
    }


    buildElements(){

        /****************
        Many elements to a Title Card:
        -date
        -location
        -organization
        -underlining for summary and/or highlights

        *****************/
        
        const hasHighlights = this.props.highlights.length > 0 ? true : false;
        let start = this.props.startDate.getUTCFullYear();
        let end = this.props.endDate ? this.props.endDate.getUTCFullYear() : null;
        let dateString = ''
        if (!end) {
            dateString = `${start} - present`;
        }
        else if (start === end) {
            dateString = start;
        }
        else {
            dateString = `${start} - ${end}`
        }

        let titleSpanClasses = 'title ilb';
        let summarySpanClasses = 'summary';
        
        
        // Underlining will depend on the dispay type.  Timeline display is compact, 
        // so presence of summary or highlights will trigger underlining.  Position 
        // of underling will depend on if summary is visible or not.
        if (
            this.props.groupFlag == false && 
            (this.props.summary || hasHighlights)
            ) {
            titleSpanClasses += " has-highlights";
        }
        else if (this.props.summary && hasHighlights) {
            summarySpanClasses += " has-highlights";
        }
        else if (!this.props.summary && hasHighlights) {
            titleSpanClasses += " has-highlights";
        }

        // combine organization and location
        let loc = '';
        if (this.props.location != null){
            loc = ", " + this.props.location;
        }
        const org_loc = `\u2013 ${this.props.organization} ${loc}`;


        const dateComponent =  
            <SimpleText 
                key="1" 
                text={dateString}
                spanClasses="title-date" 
                divClasses="title-element"
            />


        const titleComponent =  
            <div 
                key="2" 
                className={titleSpanClasses}
            >

                <SimpleText 
                    text={this.props.title} 
                    spanClasses="title-text ilb"
                    divClasses="title-element"
                />
            
                <SimpleText 
                    text={org_loc} 
                    spanClasses="title-org ilb"
                    divClasses="title-element"
                />
            </div>



        let returnArray = [
            dateComponent,
            titleComponent
        ];

        // If there is a summary, add it to the return array.
        if ((this.props.summary && this.props.groupFlag) || 
            (
            this.props.summary &&
            this.props.groupFlag == false &&
            this.props.highlightTracker[this.props.title+this.props.organization]
            )
            )
        {
            returnArray.push(
                <ReactMarkdown 
                    source={this.props.summary}
                    key="4"
                    className={summarySpanClasses}
                />
            );
        }
        
        return returnArray;
        
    }

    render(){
        const hasHighlights = this.props.highlights.length > 0;
        let className = 'title-card';
        let expandable = false;
        if (hasHighlights || (this.props.groupFlag == false && this.props.summary)){
            expandable = true;
            className += ' titlecard-has-highlights';
        }
            
        return (
                <div 
                    className={className}
                    onClick={expandable ? this.clickAction.bind(this) : null }
                >
                    {this.buildElements()}
                </div>
            );
    }


}
