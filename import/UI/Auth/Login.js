import React from 'react';
import PropTypes from 'prop-types';
class Login extends React.Component{
    render(){
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmitHandler} noValidate>
                    <input type="email"  placeholder="E-mail" name="email" />
                    <input type="password" name="password" />
                    <button>Login</button>
                </form> 
            </React.Fragment>
        );
    };
    onSubmitHandler = (e) => {
        e.preventDefault();
        const user = {
            email: e.target.email.value.trim(),
            password: e.target.password.value.trim(),
        };
        this.props.onSubmit(user.email,user.password);
    }
};

Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Login;