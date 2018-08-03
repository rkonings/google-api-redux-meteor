import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Session } from 'meteor/session';

/*
{
  "web": {
    "client_id": "943856840196-7im8eekcum327obuump98nb823ccmsn1.apps.googleusercontent.com",
    "project_id": "totemic-vim-210910",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "sJ5XmF98jJ0yHxvr6h7zgsQq",
    "redirect_uris": [
      "http://localhost:8000/oauth2callback"
    ],
    "javascript_origins": [
      "http://localhost:8000"
    ]
  }
}

*/


export class OauthContainer extends React.Component{ 

    state = {
        requestTokenUrl: null,
    }

    componentDidMount(){
        if(this.props.location.pathname == "/oauth/oauth2callback"){
            const code = this.props.location.search.substring(6);

            const t = Meteor.call('oauth.token.get', code, (error,result) => {
                console.log('[OAUTH CALL] (error, result)', error, result);
                this.setState({
                    ...this.state,
                    token: result,
                });
                this.props.history.replace('/oauth');
                });
        }
        
        const t = Meteor.call('oauth', null, (error,result) => {
            console.log('[OAUTH CALL] (error, result)', error, result);
            if(result){
                this.setState({
                    ...this.state,
                    requestTokenUrl: result,  
                })
            }
            });
    }

    requestTokenHandler = () => {
        window.location = this.state.requestTokenUrl;
    }

    render(){
        const { classes } = this.props;

        const button = (this.state.requestTokenUrl) ? <button onClick={ () => this.requestTokenHandler()  }>Request Token</button> : null;

        return(
            <div className={classes.Container}>OAuthContainer{button}</div>
        );
    }
}

OauthContainer.propTypes = {
  
};

const mapStateToProps = state => {
    return {
        //tasks: state.task.tasks,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //add: (task) => dispatch( TaskActions.add(task) ),
        //remove: (id) => dispatch( TaskActions.remove(id) ),
    };
};

const styles = theme => ({
 
   
  })
  

export default connect( mapStateToProps, mapDispatchToProps )(injectSheet(styles)(OauthContainer));