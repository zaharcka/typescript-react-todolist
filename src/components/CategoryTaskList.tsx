import React from 'react';
import {TaskComponent} from "./Task";
import {RouteComponentProps} from "react-router";

interface MatchParams {
    id: string;
};

interface CategoryTaskListProps extends RouteComponentProps<MatchParams> {
    tasks: Array<Task>;
}


export const CategoryTaskList: React.FC<CategoryTaskListProps> = ({tasks, match}) => {
    return (
        <div>
        {tasks.filter(i => i.category === Number(match.params.id)).map(item => <TaskComponent task={item} toggleTask={() => {}} selectTask={() => {}}/>)}
        </div>
    )
}