import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from "./components/header";
import Home from "./components/home";
import Issue from "./components/issue";
import Repo from "./components/repo";

function App() {
    return (
        <>
            <Router>
                <Header/>
                <Route exact path='/' component={Home}/>
                <Route path='/repo/:accountName/:repoName' component={Repo}/>
                <Route path='/issue/:accountName/:repoName/:issueID' component={Issue}/>
            </Router>
        </>
    );
}

export default App;