import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TaskActions from './../Stores/Task/TaskActions';
import injectSheet from 'react-jss';
import NewTask from '../UI/Task/NewTask';
import TaskList from '../UI/Task/TaskList';

export class TasksContainer extends React.Component{ 
    render(){
        const { classes } = this.props;

        return(
            <React.Fragment>
                <div className={classes.Title}>Tasks</div>
                    <NewTask onSubmit={ (task) => this.props.add(task)} />
                    <TaskList tasks={this.props.tasks} remove={this.props.remove} />
            </React.Fragment>
        );
    }
}

TasksContainer.propTypes = {
    tasks: PropTypes.array.isRequired,
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        tasks: state.task.tasks,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        add: (task) => dispatch( TaskActions.add(task) ),
        remove: (id) => dispatch( TaskActions.remove(id) ),
    };
};

const styles = theme => ({
    Title: {
      color: theme.color.primary,
    },
   
  })
  

export default connect( mapStateToProps, mapDispatchToProps )(injectSheet(styles)(TasksContainer));