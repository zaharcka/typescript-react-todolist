import React, { useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MenuItem, Select, TextField } from "@material-ui/core";
import moment from "moment";

interface ModalDialogProps {
    open: boolean;
    handleClose: handleClose;
    save: saving;
    task: Task;
    categories: Array<Category>;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({open, handleClose, task, save, categories}) => {

    const [newTitle, setNewTitle] = useState(task.title);
    const [newDescription, setNewDescription] = useState(task.description );
    const [newDate, setNewDate] = useState(task.date);
    const [newCategory, setNewCategory] = useState(task.category);

    useEffect(() => {

            setNewTitle(task.title);
            setNewDescription(task.description);
            setNewDate(task.date);
            setNewCategory(task.category);
    }, [task]);

    const clearData = () => {
        setNewTitle('');
        setNewDescription('');
        setNewDate('');
        setNewCategory(1);
    };

    const close = () => {
        handleClose();
        clearData();
    };

    const handleCategory = (e: any) => {
        console.log('e>>>>', e);
        setNewCategory(e);
    }

    const saveClick = () => {
        const updatedTask = {
            ...task,
            title: newTitle,
            description: newDescription,
            date: newDate,
            category: newCategory,
        }
        save(updatedTask);
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
            <DialogContent>
                <div>
                    <TextField

                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        value={newTitle}
                        onChange={e => {
                            setNewTitle(e.target.value)
                        }}
                    />
                </div>
                <div style={{marginTop: 20}}>
                    <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        value={newDescription}
                        onChange={e => {
                            setNewDescription(e.target.value);
                        }
                        }
                    />
                </div>
                <div>
                    <TextField
                        id="date"
                        label="Deadline"
                        type="date"
                        defaultValue={moment(newDate).format('YYYY-MM-DD')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => setNewDate(e.target.value)}
                    />
                </div>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newCategory}
                    onChange={e => handleCategory(e.target.value)}
                >

                    {
                        categories.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)

                    }
                </Select>
            </DialogContent>

            <DialogActions>
                <Button onClick={saveClick} color="primary">
                    Save
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}