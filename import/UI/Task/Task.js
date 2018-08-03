import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

export const Task = (props) => {
    const { classes } = props;
    return (
        <div
            className={classes.Task}>
            {props.task.title || "No title"} 
            <button onClick={() => props.remove(props.task._id)}>Remove</button>
        </div>);

}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,
}

const styles = theme => ({
    Task: {
      //color: theme.color.primary,
      padding: theme.spacing.unit,
      //border: '1px solid #000',
      marginBottom: 10,
      background: '#f9f9f9',

    },
   
  })
  

export default injectSheet(styles)(Task);