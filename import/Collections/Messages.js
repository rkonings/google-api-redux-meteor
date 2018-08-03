import { Mongo } from 'meteor/mongo';
import { Meteor} from 'meteor/meteor';
const Messages = new Mongo.Collection('Messages');

if(Meteor.isServer){
    Meteor.publish('messages.public', function() {
        return Messages.find({});
    });
}

export default Messages;