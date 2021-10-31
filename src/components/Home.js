import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Home extends ( Component ){

    render(){
        return (
            <div className="container">
                 HI! I'm Sanjuro and this is my site.  I'm a web developer based in Portland, Oregon, which you might not guess based on this sad little website.  But who has time for personal projects?  Apparently not me.  I do have ambitions to build things so you might check back in a year or two to see if anything has changed.
                 <br/><br/>
              I'm pretty happily employed but if you want to look at my <Link to="/resume">resume</Link>, it's the only remotely interesting thing on the website.
             </div>
        );
    }
}