import React from 'react';
import {TaskComponent} from "./Task";
import {DragDropContext} from "react-beautiful-dnd";

interface TaskListProps {
    tasks: Array<Task>;
    toggleTask: toggleTask;
    selectTask: selectTask;
}

export const TaskList: React.FC<TaskListProps> = (props: TaskListProps) => {
    const { toggleTask, tasks, selectTask } = props;

    const onDragEnd = (result: any) => {
        if (result.destination) {
            return;
        }
    }

    return (
        <React.Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
            {
                tasks.map(task => {
                    return <TaskComponent key={task.title} task={task} toggleTask={toggleTask} selectTask={selectTask} />
                })
            }
            </DragDropContext>
        </React.Fragment>
    );
};


