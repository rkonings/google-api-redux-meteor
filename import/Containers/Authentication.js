import React from 'react';
import { connect } from 'react-redux';
import UserActions from './../Stores/User/UserActions';
import Login from './../UI/Auth/Login'; 

class AuthenticationContainer extends React.Component{

    componentDidMount(){
        this.props.login('randy@randykonings.nl','Rk@26068713');
    }
    render(){
        return (
            <React.Fragment>
                {this.props.error ? <div className="error">{this.props.error}</div> : null}
                <Login onSubmit={this.props.login} />
                <div>AuthenticationContainer</div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.user.error,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        login: (email,password) => dispatch( UserActions.login(email,password) ),
    };
};
export default connect( mapStateToProps, mapDispatchToProps )(AuthenticationContainer);
