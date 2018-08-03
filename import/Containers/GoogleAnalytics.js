import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Session } from 'meteor/session';
import Moment from 'moment';
import ProfileSelector from '../UI/Google/Analytics/ProfileSelector';
import GoogleAnalyticsAction from '../Stores/GoogleAnalytics/GoogleAnalyticsActions';
import BarChart from '../UI/Google/Analytics/BarChart';


export class GoogleAnalyticsContainer extends React.Component{ 

    componentDidMount(){
        this.props.requestAccounts();
    }


    requestData = (profileId) => {
        const options = {
            'start-date': Moment().subtract(60,'days').format('Y-MM-DD'),
            'end-date': 'yesterday',
            'metrics': 'ga:pageviews,ga:sessions',
            'dimensions' : 'ga:date',
        };
        
        this.props.requestData(profileId, options);

    }

    render(){
        const { classes } = this.props;
        const data = this.props.data ? this.props.data.rows : [];

        return(
            <div className={classes.Container}>
                <h2>Google Analytics </h2>
                <ProfileSelector 
                    getAccounts={this.props.requestAccounts}
                    getWebproperties={this.props.requestWebProperties}
                    requestProfiles={this.props.requestProfiles}
                    onChange={this.requestData}
                    accounts={this.props.accounts}
                    webProperties={this.props.webProperties}
                    profiles={this.props.profiles}
                />
                <BarChart data={data} />

            </div>

        );
    }
}



GoogleAnalyticsContainer.propTypes = {
  
};

const mapStateToProps = state => {
    return {
        accounts: state.googleAnalytics.accounts,
        webProperties: state.googleAnalytics.webProperties,
        profiles: state.googleAnalytics.profiles,
        data: state.googleAnalytics.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestAccounts: () =>  dispatch( GoogleAnalyticsAction.requestAccounts() ),
        requestWebProperties: (accountId) => dispatch( GoogleAnalyticsAction.requestWebProperties(accountId) ),
        requestProfiles: (accountId, webPropertyId) => dispatch( GoogleAnalyticsAction.requestProfiles(accountId, webPropertyId) ),
        requestData: (profileId, options) => dispatch( GoogleAnalyticsAction.requestData(profileId, options) ),
    };
};

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
  

export default connect( mapStateToProps, mapDispatchToProps )(injectSheet(styles)(GoogleAnalyticsContainer));