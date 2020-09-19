import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect
} from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Pickup } from './Pickup';

const App = () => (
    <Router>
        <header>
            <div></div>
            <nav>
                <ul>
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="/add-pickup">Add Pickup</NavLink></li>
                    {/* <li><Link to="/driver/1">Driver 1</Link></li> */}
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
                <div className="inner inner--small">
                    <h1>Thank you for adding a pickup.</h1>
                </div>
            </Route>
            <Route path="/">
                <Redirect to="/dashboard" />
            </Route>
        </Switch>
    </Router>
);

export default App;
