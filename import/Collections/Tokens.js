import { Mongo } from 'meteor/mongo';
import { Meteor} from 'meteor/meteor';

const Tokens = new Mongo.Collection('Tokens');

if(Meteor.isServer){
    /*
    Meteor.methods({
        'task.remove'(_id){
            if(!this.userId)throw new Meteor.Error('not-authorized');
            const t = Tasks.remove({
                _id,
                userId: this.userId,
            });
            return t;
        }

    });

    */
}


export default Tokens;