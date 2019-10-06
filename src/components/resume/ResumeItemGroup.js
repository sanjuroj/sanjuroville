import React, { Component } from 'react';
import TitleCard from './TitleCard';
import HighlightBox from './HighlightBox';

export default class ResumeItemGroup extends Component {


    getCircle(){
        if(this.props.groupFlag == false) {
            return(
                <div className={'timeline-circle ' + this.props.icon}></div>
            );
        }
    }
    
    
    renderHighlights(){
        return(
            <HighlightBox 
                highlights={this.props.highlights} 
                className="highlight-box"
            />
        );
    }

    render() {
        //console.log('rig props', this.props);
        //console.log('prop=', this.props.highlightTracker)
        //console.log('title=', this.title)
        let inclHighlights = false;
        if (this.props.highlightTracker[this.props.title+this.props.organization] &&
            this.props.highlights.length > 0){

            inclHighlights = true;
        }
        
        return(
            <div className="titleRow">
                {this.getCircle()}
                <div className='res-itemgroup'>
                    <TitleCard {...this.props} />
                    {inclHighlights ? this.renderHighlights() : null}
                </div>
            </div>
        );
    }
    
    

    // render() {
    //     //console.log('rig props', this.props);
    //     //console.log('prop=', this.props.highlightTracker)
    //     //console.log('title=', this.title)
    //     if (this.props.highlightTracker[this.props.title]){
    //         //console.log('here');
    //         return(
    //             {this.getIcon()}
    //             <div className='res-itemgroup'>
    //                 <TitleCard {...this.props} />
    //                 <HighlightBox highlights={this.props.highlights} className="highlight-box" />
    //             </div>
    //         );
    //     }
    //     else{
    //         //console.log('there');
    //         return(
    //             {this.getIcon()}
    //             <div className='res-itemgroup'>
    //                 <TitleCard {...this.props} />
    //             </div>
    //         );  
    //     }
    
    // }

}