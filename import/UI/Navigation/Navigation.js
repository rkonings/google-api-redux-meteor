import React from 'react';
import { Link } from 'react-router-dom'; 

const Navigation = (props) => {

    const privateNavigation = (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
            <li><Link to="/oauth">oAuth</Link></li>
            <li><Link to="/google/analytics">Google Analytics</Link></li>
            <li><button onClick={()=>props.logoutHandler()}>Logout</button></li>
        </ul>
    );

    const publicNavigation = (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/oauth">oAuth</Link></li>
            <li><Link to="/google/analytics">Google Analytics</Link></li>
        </ul>
    );

    return props.loggedIn ? privateNavigation : publicNavigation;
}

export default Navigation;