import { Meteor } from 'meteor/meteor';
import { google } from 'googleapis';
import Tokens from './../Collections/Tokens';

const OAuth2ClientWithToken = (userId) => {

    const oauth2Client = new google.auth.OAuth2(
        '943856840196-7im8eekcum327obuump98nb823ccmsn1.apps.googleusercontent.com',
        'sJ5XmF98jJ0yHxvr6h7zgsQq',
        'https://rkonings-meteor-google-api.herokuapp.com/oauth/oauth2callback'
    );

    const _token = Tokens.findOne({userId},{ sort: { createdAt: -1 } });
    if(!_token) throw new Meteor.Error('no-token-found');
    oauth2Client.setCredentials(_token);
    return oauth2Client;
}

export default OAuth2ClientWithToken;

