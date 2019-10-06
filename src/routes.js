import React, { Component } from 'react';
import { Router, Route, IndexRedirect, IndexRoute, browserHistory} from 'react-router';
import Resume from './containers/Resume';
import Home from './components/Home';
import About from './components/About';
import OldHomepage from './components/OldHomepage';
import Header from './components/Header';
import PageNotFound from './components/PageNotFound';

class PageWithHeader extends Component {
    render() {
        return (
            <div>
                <Header />
                <div id="main-body">
                    {this.props.children}
                </div>
            </div>

        );
    }
}

export default function routes(){
    return (
        <Router history={browserHistory}>
            <Route path='/' component={PageWithHeader}>
                <IndexRedirect to="home" />
                <Route path='home' component={Home} />
                <Route path='resume' component={Resume} />
                <Route path='about' component={About} />
            </Route>
            <Route path='/old-homepage' component={OldHomepage} />
            <Route path='/*' component={PageWithHeader}>
                <IndexRoute component={PageNotFound} />
            </Route>
        </Router>
    );
}