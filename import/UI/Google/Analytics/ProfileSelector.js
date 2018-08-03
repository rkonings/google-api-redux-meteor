import React from 'react';
import injectSheet from 'react-jss';

class ProfileSelector extends React.Component{

    componentDidMount(){
        this.props.getAccounts();
    }

    render(){
        const { classes } = this.props;

        const accounts = this.props.accounts.map( (account) => {
            return (<div onClick={ () => this.props.getWebproperties(account.id)} className={classes.GoogleAnalyticsAccount} key={account.id}>{account.name}</div>);
        } )

        const webProperties = this.props.webProperties.map( (webProperty) => {
            return (<div onClick={ () => this.props.requestProfiles(webProperty.accountId, webProperty.id)} className={classes.GoogleAnalyticsWebProperty} key={webProperty.id}>{webProperty.id}</div>);
        } );

        const profiles = this.props.profiles.map( (profile) => {
            return (<div onClick={ () => this.props.onChange(profile.id)} className={classes.GoogleAnalyticsProfile} key={profile.id}>{profile.id}</div>);
        } );

        return(
            <div className={classes.Container}>
                <h2>Profile selector</h2>
                {accounts.length > 0 ? accounts : 'No accounts'}
                <h2>WebProperties</h2>
                {webProperties.length > 0 ? webProperties : 'No properties' }
                <h2>Profiles</h2>
                {profiles.length > 0 ? profiles : 'No profiles'}
            </div>

        );
    }
}

const styles = theme => ({
    GoogleAnalyticsAccount: {

    },
    GoogleAnalyticsProfile: {

    },
    GoogleAnalyticsWebProperty: {

    },
    
    GoogleAnalyticsProfiles: {

    },
 
   
  })
  


export default injectSheet(styles)(ProfileSelector);