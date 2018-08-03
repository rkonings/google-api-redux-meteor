import React from 'react';
import { connect } from 'react-redux';
import TaskActions from '../Stores/Task/TaskActions';


class SubscriptionManagerContainer extends React.Component{
    componentWillReceiveProps(props){
        if(props.loggedIn && !props.taskSubscription){
            this.updateSubscriptions();    
        }
    }
    updateSubscriptions(){
            this.props.dispatch( TaskActions.subscribe() );
    }
    render(){
        return (
            <div className="SubscriptionManager">
                <h1>Subscription Manager</h1>
                <button onClick={() => this.props.dispatch( TaskActions.unsubscribe() )}>Tasksubscription unsubscribe</button>
                <button onClick={() => this.props.dispatch( TaskActions.subscribe() )}>Tasksubscription subscribe</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn:           state.user.loggedIn,
        taskTracker:        state.task.tracker,
        taskSubscription:   state.task.subscription,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: ( action ) => dispatch( action ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(SubscriptionManagerContainer);