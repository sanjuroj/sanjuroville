import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/';
import { getDatedData } from '../utils/getResData';
import NameLevelBlurbList from '../components/resume/NameLevelBlurbList';
import ControlBar from '../components/resume/ControlBar';
import ContactBox from '../components/resume/ContactBox';
import CategoryGroup from '../components/resume/CategoryGroup.js';

class Resume extends Component {
    
    makeTitle(title, location, modifier=null){
        if (modifier==null){
            return (`${title}, ${location}`);
        }
        else {
            return (`(${title} in ${modifier}, ${location}`);
        }
    }

    sortResDataByLevel(data, type='fwd') {
        let sortedData = data;
        if(type == 'fwd'){
            sortedData = data.sort(function(a, b) {
                return a.level > b.level;
            });
        }
        else if(type == 'rev'){
            sortedData = data.sort(function(a, b) {
                return a.level < b.level;    
            });
        }
        else if(type.constructor === Array){
            sortedData = data.sort(function(a, b) {
                let aIndex = type.indexOf(a.level);
                let bIndex = type.indexOf(b.level);
                return aIndex > bIndex;
            });

        }

        return sortedData;
    }
   

    componentWillMount() {
        var { dispatch } = this.props;
        dispatch(fetchData());
    }

    buildCategoryList(posData){
        const posList = posData.map( (item, key) => {
            return (<CategoryGroup {...item} 
                        dispatch={this.props.dispatch} 
                        highlightTracker={this.props.highlightTracker} 
                        groupFlag={this.props.groupFlag}
                        key={key}/>);
        }, this);
        return posList;
        
        
    }

    render(){
        const datedData = getDatedData(this.props.resumeData, this.props.groupFlag);
        const categoryList = this.buildCategoryList(datedData);
        let langSort = ['Native', 'Elementary'];
        if (categoryList !== 'undefined') {
            return(
                
                <div className="resume-body container">
                    <ContactBox />
                    <div className="resume-heading">
                        I love making data useful and digestible.  Whether it's related to
                        finances, DNA sequences, or international development I have enjoyed
                        the technical challenges of organizing, analyzing, and ultimately, telling a
                        story with data.  Sometimes I'm the one telling the story, but often I'm
                        facilitating someone else who can tell the story better.
                        I work best in a highly collaborative small team environment where ideas and
                        opinions are expressed both respectfully and unreservedly.
                        <br/><br/>
                        An interactive version of my resum&#233; is displayed below.  
                        Underlined items contain additional details that can viewed by 
                        clicking on the title. 
                        The control bar buttons can be used to change item layout.
                        
                        <br/><br/>
                    </div>
                    <ControlBar 
                        {...this.props} 
                        
                        expandable={datedData}/>
                    <div className="resume-data">
                        <section id="dated-items" >
                            {categoryList}
                        </section>
                        <section id="skilz" className="skilz-card" >
                            <NameLevelBlurbList 
                                data={this.sortResDataByLevel(this.props.resumeData.skill, 'rev')} 
                                heading="SKILLS"
                                showLevels={false}
                            />
                        </section>
                        <section id="languages" className="lang-card" >
                            <NameLevelBlurbList 
                                data={this.sortResDataByLevel(this.props.resumeData.language, langSort)} 
                                heading="LANGUAGES" />
                        </section>
                        
                    </div>
                
                </div>
            
            );
        }
        else {
            return (<div>No Data Found</div>);
        }
        
    }


}

const mapStateToProps = (state) => {
    return(state);
};

export default connect(mapStateToProps)(Resume);