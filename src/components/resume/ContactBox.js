import React, { Component } from 'react';



export default class Button extends Component {
    
    render(){
        return (
            
            <div id="contact-div">
                
                <div id="contact-links">
                    <a href="mailto:rosebud@sanjuro.net" target="_blank">Email</a><br/>
                    <a href="https://github.com/sanjuroj" target="_blank">GitHub</a><br/>
                    <a href="https://www.linkedin.com/in/sanjurojogdeo" target="_blank">LinkedIn</a>
                </div>
            
                
                <div id="contact-icons">
                    <a href="mailto:rosebud@sanjuro.net" target="_blank">
                        <img src={require('../../../assets/icons/email-envelope-outline.svg')} />
                    </a><br/>
                    <a href="https://github.com/sanjuroj" target="_blank">
                        <img src={require('../../../assets/icons/github-fit.svg')} />
                    </a><br/>
                    <a href="https://www.linkedin.com/in/sanjurojogdeo" target="_blank">
                        <img src={require('../../../assets/icons/linkedin-logo.svg')} />
                    </a><br/>
                </div>
                
            </div>
        );
    }

}