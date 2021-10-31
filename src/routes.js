import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Resume from './containers/Resume';
import Home from './components/Home';
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
        <Router>
            <PageWithHeader>
                <Switch>
                    <Route path={'/home'}>
                        <Home/>
                    </Route>
                    <Route path={'/resume'}>
                        <Resume/>
                    </Route>
                    <Route path={'/'}>
                        <Home/>
                    </Route>
                </Switch>
            </PageWithHeader>
        </Router>
    );
}

