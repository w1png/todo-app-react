import axios from 'axios';

export type Task = {
    id: number;
    cookie: string;
    title: string;
    completed: boolean;
};

export function getTasks(): Promise<Task[]> {
    const tasks = axios.get('/api/tasks').then((response: any) => response.data);
    console.log(tasks);
    return tasks;
}

export function deleteTask(): Promise<void> {
    return axios.delete('/api/tasks').then((res: any) => res.data);
}

export function createTask(task: Task): Promise<Task> {
    const headers = {
        'Content-Type': 'application/json',
    };
    return axios.post('/api/tasks', task, { headers }).then((res: any) => res.data);
}
