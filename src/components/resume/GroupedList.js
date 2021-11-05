import React, { Component } from 'react';

export default class GroupedList extends Component {
    makeList(){
        const groupedSkills = this.props.data.reduce((accumulator, currentSkill) => {
            if (accumulator[currentSkill.skill_group]) {
                accumulator[currentSkill.skill_group].push(currentSkill);
            }
            else {
                accumulator[currentSkill.skill_group] = [currentSkill];
            }
            return accumulator;
        }, {})
        for (const group in groupedSkills) {
            groupedSkills[group] = groupedSkills[group].sort((a, b) => a.sort_order > b.sort_order)
        }

        return(this.props.skillGroups.map( (group, keyID) => {
            if (!groupedSkills[group[0]]) {
                return null;
            }
            return (
                <li key={keyID}>
                    <span className="nlb-name">{group[1]}: </span>
                    {groupedSkills[group[0]].map(skill => skill.name).join(", ")}
                </li>
            );

        }));
    }


    render() {
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
