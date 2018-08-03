import { Mongo } from 'meteor/mongo';
import { Meteor} from 'meteor/meteor';
import Moment from 'moment';

const Tasks = new Mongo.Collection('Tasks');


if(Meteor.isServer){
    
    Meteor.publish('tasks.private', function() {
        if(!this.userId)throw new Meteor.Error('not-authorized');
        return Tasks.find(
            { userId: this.userId},{ sort: { createdAt: -1 } });
    });

    Meteor.methods({
        'task.insert'(task){
            if(!this.userId)throw new Meteor.Error('not-authorized');
            task.userId = this.userId;
            task.createdAt = Moment().valueOf();
            const t = Tasks.insert(task);
            return t;
        },
        
        'task.remove'(_id){
            if(!this.userId)throw new Meteor.Error('not-authorized');
            const t = Tasks.remove({
                _id,
                userId: this.userId,
            });
            return t;
        }

    });


}

export default Tasks;