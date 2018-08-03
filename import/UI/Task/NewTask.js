import React from 'react';
import SimpleSchema from 'simpl-schema';
import injectSheet from 'react-jss';

class NewTask extends React.Component{

    state = {
        error: '',
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const task = {
            title: e.target.title.value.trim(),
        }

        const schema = new SimpleSchema({
            title: {
                type: String,
                min: 1,

            }, 
        });

        try{
            schema.validate(task);
            this.props.onSubmit(task);

        }
        catch(e){
            this.setState({
                ...this.state,
                error: e.message,
            });
        }

    }

    render(){
        const { classes } = this.props;

        return (
            <div className={classes.Wrapper}>
                <div className="error">{this.state.error}</div>
                <form onSubmit={this.onSubmitHandler} noValidate>
                    <input type="text"  placeholder="Taak" name="title" />
                    <button>Add Task</button>
                </form> 
            </div>
        );
    };
};

const styles = theme => ({
    Wrapper: {
      //color: theme.color.primary,
      padding: theme.spacing.unit,
      //border: '1px solid #000',
      marginBottom: 10,
      background: '#f9f9f9',

    },
   
  })

export default injectSheet(styles)(NewTask);