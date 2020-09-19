import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Pickup } from './Pickup';

const App = () => (
    <Router>
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/add-pickup">Add Pickup</Link></li>
                    <li><Link to="/driver/1">Driver 1</Link></li>
                </ul>
            </nav>
        </header>
        <Switch>
            <Route path="/driver/:driverId" exact>
                <div>NOT IMPLEMENTED: Driver</div>
            </Route>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            <Route path="/add-pickup" exact>
                <Pickup />
            </Route>
            <Route path="/add-pickup/done" exact>
                <div>NOT IMPLEMENTED: Thank you for adding a pickup.</div>
            </Route>
            <Route path="/">
                <div>NOT IMPLEMENTED: Home</div>
            </Route>
        </Switch>
    </Router>
);

export default App;
