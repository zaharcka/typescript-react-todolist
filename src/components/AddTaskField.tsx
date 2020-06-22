import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import moment from "moment";
import styled from "@material-ui/core/styles/styled";


const StyledField = styled(TextField)({
    marginLeft: 26,
    marginRight: 26,
})

interface AddTaskFieldInterface {
    onAdd: addingToDo;
};

export const AddTaskField: React.FC<AddTaskFieldInterface> = ({onAdd}) => {


    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        date: moment().format('YYYY-MM-DD'),
        complete: false,
        category: 0,
    });

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask({
            ...newTask,
            title: e.target.value,
        });
    };

    const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask({
            ...newTask,
            date: e.target.value,
        });
    };

    const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask({
            ...newTask,
            description: e.target.value,
        });
    };

    const handleAdd = () => {
        onAdd(newTask);
    };


    return (
        <React.Fragment>

            <StyledField id="outlined-basic" label="Title" variant="outlined"
                       value={newTask.title} onChange={handleChangeInput}/>
            <StyledField id="outlined-basic" label="Description" variant="outlined"
                       value={newTask.description} onChange={handleChangeDescription}/>
            <StyledField
                id="date"
                label="Deadline"
                type="date"
                defaultValue={moment().format('YYYY-MM-DD')}

                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleChangeDate}
            />
            <Button variant="contained" onClick={handleAdd}>Add task</Button>

        </React.Fragment>
    )
};