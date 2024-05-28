import React from 'react';
import './firebase'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreatePoll from './CreatePoll';
import VotePoll from './VotePoll';
import AdminPoll from './AdminPoll';

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route path="/" exact component={CreatePoll} />
                    <Route path="/vote/:pollId" component={VotePoll} />
                    <Route path="/admin/:pollId" component={AdminPoll} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
