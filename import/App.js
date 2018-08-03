import React from 'react';
import TaskContainer from './Containers/Tasks';
import AuthenticationContainer from './Containers/Authentication';
import SubscriptionManagerContainer from '../import/Containers/SubscripionManager';
import GoogleAnalyticsContainer from '../import/Containers/GoogleAnalytics';
import OauthContainer from '../import/Containers/Oauth';
import { connect } from 'react-redux';
import Navigation from './UI/Navigation/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import createBrowserHistory from 'history/createBrowserHistory';
import UserActions from './Stores/User/UserActions';

class App extends React.Component{
    render(){
        const publicRoutes = (
            <Switch>
                <Route path="/" exact component={AuthenticationContainer} />
                <Route path="/oauth" component={OauthContainer} />
                <Route path="/google/analytics" component={GoogleAnalyticsContainer} />
            </Switch>
        );

        const privateRoutes = (
            <Switch>
                <Route path="/" exact component={TaskContainer} />
                <Route path="/oauth" component={OauthContainer} />
                <Route path="/google/analytics" component={GoogleAnalyticsContainer} />
                
            </Switch>
        );

        return (
            <div className="App">
                <SubscriptionManagerContainer />
                <Router>
                    <>
                        <Navigation loggedIn={this.props.loggedIn} logoutHandler={this.props.logout} />
                        {this.props.loggedIn ? privateRoutes : publicRoutes}
                    </>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        loggedIn: state.user.loggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: ( action ) => dispatch( action ),
        logout: () => dispatch( UserActions.logout() ),
    };
};
export default connect( mapStateToProps, mapDispatchToProps )(App);