import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Home extends ( Component ){

    render(){
        return (
            <div className="container">
                 HI! I'm Sanjuro and this is my site.  Well, technically, I'm the person who typed the words into the electronic file that you are now reading through the magic of the internet, but there's no need to be quite so pedantic.  You are witnessing the site in it's first blush of redevelopment, after having been <Link to="/old-homepage" target="_blank">ignored</Link> for far too long.
                 <br/><br/>
                 So far, my main creation is the interactive <Link to="/resume">resumé app</Link>. which I made with Django and React.  You can read all about what tools I used on the <Link to="/about">About page</Link>.  I have a near term plan to put up some pictures from my ~1.5 year walkabout, and to start working on a blog/lab notebook sort of thing.  Stay tuned for those.
                 <br/><br/>
                 Hope you are treating life well.
             </div>
        );
    }
}