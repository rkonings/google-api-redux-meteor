import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import FlipMove from 'react-flip-move';

export const TaskList = (props) => {
    
    const tasks = props.tasks.map((task)=>{
        return <Task key={task._id} task={task} remove={props.remove} />
    });

    return (
        <div className="TaskList">
            <FlipMove
                 staggerDurationBy="30"
                 duration={500}
                 maintainContainerHeight="true"
                 enterAnimation="fade">
                    {tasks.length > 0 ? tasks : <div className="Empty">No Tasks</div> }
            </FlipMove>
        </div>
    );
}


TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired,
}

export default TaskList;