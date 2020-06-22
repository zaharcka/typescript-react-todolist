import React, {useCallback, useEffect, useState} from 'react';
import {Container} from "@material-ui/core";
import {SimpleTabs} from "./components/taskTab";
import {AddTaskField} from "./components/AddTaskField";
import {ModalDialog} from "./components/Dialog";
import {BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';
import {CategoryTaskList} from "./components/CategoryTaskList";
import {useDispatch, useSelector} from "react-redux";


interface RootState {
    tasks: Array<Task>;
};

interface Ids {
    id: string;
}

interface CategoryTaskListProps extends RouteComponentProps<Ids> {
    tasks: Array<Task>;
}

const mockCategory: Array<Category> = [
    {
        id: 0,
        name: 'First category',
    },
    {
        id: 1,
        name: 'Second category',
    },
    {
        id: 2,
        name: 'Third category',
    },
]

const App: React.FC = () => {

    const addTaskAction = (payload: Task) => ({
        type: 'ADD_TASK',
        payload,
    });

    const editTaskAction = (payload: Array<Task>) => ({
        type: 'RELOAD_TASKS',
        payload,
    });

    const receiveTaskAction = () => ({
        type: 'GET_API',
    })

    const reduxTasks = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch();
    const dispatchTask = useCallback((task: Task) => dispatch(addTaskAction(task)), [dispatch]);
    const dispatchEditTask = useCallback((tasks: Array<Task>) => dispatch(editTaskAction(tasks)), [dispatch]);
    const dispatchApi = useCallback(() => dispatch(receiveTaskAction()), [dispatch]);


    // Load task from Backend MOCK_API

    useEffect(() => {
        if (reduxTasks.length === 0) {
            dispatchApi();
        }
    });


    const [isModalOpen, toggleModal] = useState(false);
    const [editingTask, setEditingTask] = useState({
        title: '',
        date: '',
        description: '',
        complete: false,
        category: 1,
    });



    const toggleTask: toggleTask = selectedTask => {
        const newTasks = reduxTasks.map(task => {
            if (task === selectedTask) {
                return {
                    ...task,
                    complete: !task.complete,
                }
            }
            return task;
        });
        dispatchEditTask(newTasks);
    };

    const addTask: addingToDo = newTask => {
        newTask && dispatchTask(newTask);
    };

    const selectingTask = (task: Task) => {
        setEditingTask(task);
        toggleModal(true);
    };

    const save = (task: Task) => {
        dispatchEditTask(reduxTasks.map(item => {
            if (item.title === editingTask.title) {
                return task;
            } else {
                return item
            }
        }));
        toggleModal(!isModalOpen);
        setEditingTask(reduxTasks[0]);
    }

    const handleCloseModal = () => {
        setEditingTask({
            title: '',
            date: '',
            description: '',
            complete: false,
            category: 1,

        });
        toggleModal(!isModalOpen);
    }


    return (
        <BrowserRouter>
            <Route exact path="/">
                <Container>
                    <SimpleTabs tasks={reduxTasks} toggleTask={toggleTask} selectTask={selectingTask}
                                categories={mockCategory}/>
                    <AddTaskField onAdd={addTask}/>
                    <ModalDialog open={isModalOpen} handleClose={handleCloseModal} task={editingTask} save={save}
                                 categories={mockCategory}/>
                </Container>
            </Route>
            <Route exact path="/category/:id" component={(props: CategoryTaskListProps) => <CategoryTaskList tasks={reduxTasks} {...props} />} />
        </BrowserRouter>

    );
}

export default App;
