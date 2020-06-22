import React from 'react';
import { Card, Checkbox, Typography } from "@material-ui/core";
import moment from "moment";
import styled from "@material-ui/core/styles/styled";


interface TaskProps {
    task: Task;
    toggleTask: toggleTask;
    selectTask: selectTask;
}

const StyledCard = styled(Card)({
    minWidth: 300,
    padding: 10,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
})


export const TaskComponent:React.FC<TaskProps> = ({task, toggleTask, selectTask}) => {

    const getColor = () => {
        const hours = moment(task.date).diff(moment(), 'hours');

        if (hours < 0) {
            return 'red'
        };
        if (hours < 72) {
            return 'yellow';
        }
        return 'white'
    };



    return (
        <div>
            <StyledCard style={{ backgroundColor: getColor() }}>
                <Checkbox
                    checked={task.complete}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    onChange={() => toggleTask(task)}
                />
                <Typography variant={"h5"} onClick={() => selectTask(task)}>
                    {task.title} - {moment(task.date).format('ll')}
                    <Typography>
                        {task.description}
                    </Typography>
                </Typography>
            </StyledCard>
        </div>
    )
};
