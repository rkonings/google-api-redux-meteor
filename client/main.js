import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../import/App';

import TaskReducer from '../import/Stores/Task/TaskReducer';
import UserReducer from '../import/Stores/User/UserReducer';
import OAuthReducer from '../import/Stores/Oauth/OauthReducer';
import GoogleAnalyticsReducer from '../import/Stores/GoogleAnalytics/GoogleAnalyticsReducer';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'react-jss'
import Theme from './../import/Styles/theme';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootReducer = combineReducers({
    task: TaskReducer,
    user: UserReducer,
    oauth: OAuthReducer,
    googleAnalytics: GoogleAnalyticsReducer,
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));


const app = (
    <Provider store={store}>
         <ThemeProvider theme={Theme}>
            <App />
        </ThemeProvider>
      
    </Provider>
);

Meteor.startup(()=> {
  ReactDOM.render(app,document.getElementById('app'));
}); 
