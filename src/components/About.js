import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class About extends Component {
    render(){
        return(
            <div className="container">
                I'm currently looking for a job in the Portland area.  If you're interested in checking out some of my most recent work, feel free to browse my <a href="https://github.com/sanjuroj" target="_blank">GitHub</a> page.  If you'd like to get in touch, you can reach me on <a href="mailto:rosebud@sanjuro.net" target="_blank">rosebud@sanjuro.net</a> or through <a href="https://www.linkedin.com/in/sanjurojogdeo">LinkedIn</a>. 
                <br/><br/>

                If you're curious about how this site was created, read on.  
                <br/><br/>

                Originally the site was made mostly with Django with the exception of the <Link to="/resume">resumé page</Link>, which was done in React.  I then switched to a completely React-Redux front-end using react-router for navigation.  Django is now used for data ingestion, ORM, and APIs.  It's sort of like using a shotgun to kill a fly but I get to practice with the shotgun that way.  Styling is customized <a href="http://getbootstrap.com/" target="_blank">Bootstrap</a> and <a href="http://bootswatch.com/" target="_blank">Bootswatch</a> themes.
                <br/><br/>
                Both <a href="https://github.com/sanjuroj/resumeApp-django" target="_blank">back-end</a> and <a href="https://github.com/sanjuroj/resumeApp-django" target="_blank">front-end</a> repositories are on GitHub if you would like to look at them.  



                <br/><br/><br/>
                I would also like the thank the creators of several tutorials and guides that were particularly helpful:
                <ul>
                    <li>The official <a href="https://docs.djangoproject.com/en/1.9/intro/" target="_blank">Django tutorial</a></li>
                    <li>The official, and particularly excellent, <a href="http://redux.js.org/docs/basics/ExampleTodoList.html" target="_blank">Redux tutorial</a></li>
                    <li>Sebastiano Guerriero wrote a nice <a href="https://codyhouse.co/gem/vertical-timeline/" target="_blank">guide</a> to creating timelines</li>
                    <li>I used Nick Salloum's <a href="http://callmenick.com/post/css-toggle-switch-examples" target="_blank">tutorial</a> on toggle switches
                    for the resumé page control bar, since I couldn't find anything in Bootstrap that quite did what I wanted.</li>
                </ul>

                <br/><br/>

                The LinkedIn icon was made by <a href="http://www.flaticon.com/authors/simpleicon" title="SimpleIcon" target="_blank">SimpleIcon</a> and the envelope icon was made by <a href="http://www.freepik.com" title="Freepik" target="_blank">Freepik</a>.  Both were provided by <a href="http://www.flaticon.com" title="Flaticon" target="_blank">www.flaticon.com</a>.
            </div>
        );
    }

}