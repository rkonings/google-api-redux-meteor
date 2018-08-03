import { Meteor } from 'meteor/meteor';
import Moment from 'moment';
import { google } from 'googleapis';
import Tokens from '../Collections/Tokens';

import OAuth2ClientWithToken from './Oauth2Client';

Meteor.startup(() => {

    Meteor.methods({

        'google.analytics.management.accounts.get': async function(token){
            if(!this.userId)throw new Meteor.Error('not-authorized');
            
            const oauth2Client = OAuth2ClientWithToken(this.userId);

            const analytics = google.analytics('v3');
            const r = await analytics.management.accounts.list({auth: oauth2Client}).catch( (e) => { 

                const error = (typeof e.response.data.error === "object") ? e.response.data.error.message : e.response.data.error;
                const descirption = (typeof e.response.data.error === "object") ? e.response.data.error.message : e.response.data.error_description;
                throw new Meteor.Error(error, descirption ); 
            } ); 
            return r.data;

        },

        'google.analytics.management.webproperties.get': async function(accountId){
            if(!this.userId)throw new Meteor.Error('not-authorized');
            const oauth2Client = OAuth2ClientWithToken(this.userId);

            const analytics = google.analytics('v3');
            const r = await analytics.management.webproperties.list({accountId,auth: oauth2Client}).catch( (e) => { 

                const error = (typeof e.response.data.error === "object") ? e.response.data.error.message : e.response.data.error;
                const descirption = (typeof e.response.data.error === "object") ? e.response.data.error.message : e.response.data.error_description;
                throw new Meteor.Error(error, descirption ); 
            } ); 
            return r.data;
        },

        'google.analytics.management.profiles.get': async function(accountId, webPropertyId){

            if(!this.userId)throw new Meteor.Error('not-authorized');
            const oauth2Client = OAuth2ClientWithToken(this.userId);
            const analytics = google.analytics('v3');
            const r = await analytics.management.profiles.list({
                'accountId': accountId,
                'webPropertyId': webPropertyId,
                auth: oauth2Client,
            }).catch( (e) => { 

                const error = (typeof e.response.data.error === "object") ? e.response.data.error.message : e.response.data.error;
                const descirption = (typeof e.response.data.error === "object") ? e.response.data.error.message : e.response.data.error_description;
                throw new Meteor.Error(error, descirption ); 
            } ); 
            return r.data;
        },
 
        'google.analytics.data.get': async function(profile, _options = {}){
            
            if(!this.userId)throw new Meteor.Error('not-authorized');
          
            const oauth2Client = OAuth2ClientWithToken(this.userId);

            const options = {
                'auth': oauth2Client,
                'ids': 'ga:' + profile,
                'start-date': 'today',
                'end-date': 'today',
                'metrics': 'ga:pageviews,ga:sessions',
                ..._options
            };
            
            const analytics = google.analytics('v3');
            const r = await analytics.data.ga.get(options)
                .catch( (e) => { 

                    const error = (typeof e.response.data.error === "object") ? e.response.data.error.message : e.response.data.error;
                    const descirption = (typeof e.response.data.error === "object") ? e.response.data.error.message : e.response.data.error_description;
                    throw new Meteor.Error(error, descirption ); 
                } ); 
            return r.data;
        }, 
        
    });

});