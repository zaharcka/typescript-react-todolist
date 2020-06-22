type Task = {
    title: string
    description: string;
    date: string;
    complete: boolean;
    category: number;
};

type Category = {
    id: number;
    name: string;
};

type toggleTask = (selectedTask: Task) => void;
type selectTask = (selectTask: Task) => void;

type addingToDo = (task: Task) => void;

type handleClose = () => void;
type saving = (task: Task) => void;