import { Meteor } from 'meteor/meteor';
import { google } from 'googleapis';
import Tokens from './../Collections/Tokens';
import Moment from 'moment';
import { EJSON } from 'meteor/ejson';

const oauth2Client = new google.auth.OAuth2(
    '943856840196-7im8eekcum327obuump98nb823ccmsn1.apps.googleusercontent.com',
    'sJ5XmF98jJ0yHxvr6h7zgsQq',
    'http://localhost:8000/oauth/oauth2callback'
);
  
// generate a url that asks permissions for Google+ and Google Calendar scopes
const scopes = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/analytics.readonly',
];

Meteor.startup(() => {

    Meteor.methods({

        'oauth.token.has'(){
            const _token = Tokens.findOne({userId: this.userId},{ sort: { createdAt: -1 } });
            if(!_token) throw new Meteor.Error('no-token-found');
            return true;
        },

        'oauth.token.get': async function (code){
            if(!this.userId)throw new Meteor.Error('not-authorized');            
            const token = await oauth2Client.getToken(code)
            .then( (response) => { 
                console.log(response.tokens); return response.tokens; 
            } )
            .catch( (e) => { 
                
                const error = (typeof e.response.data.error === "object") ? e.response.data.error.message : e.response.data.error;
                const descirption = (typeof e.response.data.error === "object") ? e.response.data.error.message : e.response.data.error_description;
                throw new Meteor.Error(error, descirption ); 
            
            } ); 
            
            Tokens.insert({
                ...token,
                userId: this.userId,
                createdAt: Moment().valueOf(),
            });
            
            return token;
        },
        'oauth'(){

            const url = oauth2Client.generateAuthUrl({
                // 'online' (default) or 'offline' (gets refresh_token)
                access_type: 'offline',
              
                // If you only need one scope you can pass it as a string
                scope: scopes
            });

            return url;

        },


    });

    


});
