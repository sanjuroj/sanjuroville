import React, { Component } from 'react';
  
export default class OldHomepage extends Component {
    componentDidMount() {
      document.body.className="old-body-color";
    }
    render() {
        return (
              <div id="old_homepage_body">
                <link href='http://fonts.googleapis.com/css?family=Macondo' rel='stylesheet' type='text/css'/>
                  
              
                <div className="h1">
                  <br/><br/>
                  The old site is dead. Long live the old site.
                  <br/><br/>
                  The new site is not yet living.
                  <br/><br/>
                  Expect a new Frankensite to be shocked to life in the summer of <strike>2012</strike> <strike>2013</strike> <strike>2014</strike>.
                  <br/><br/>
                  Hey, it's <strike>2015</strike> 2016 !!  I'm finally starting to work on the site again.  That being said, who has personal sites anymore?  Between Facebook and Google Plus (haha, I know, that's funny) the personal site is dead.  Well, maybe.  I need to practice putting my newfound web powers to good use, so there will be something here soon.  
                  <br/><br/>
                  In the meantime, you can always peruse my <a href="https://github.com/sanjuroj/Liston-Cronn-utility-scripts" target="_blank">GitHub page</a> to see what I've been up to coding-wise.  Or my <a href="https://www.linkedin.com/in/sanjurojogdeo" target="_blank">LinkedIn page</a> if you're thinking about hiring me (which presumably won't be on the basis of my dazzlingly brilliant personal webpage).<br/>
                  <br/><br/>
                  Hope to see you soon<br/><br/>
                  -Sanjuro
                </div>
                <br/>
                <br/>
          </div>
        );
    }
}
