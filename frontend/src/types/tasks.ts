import axios from 'axios';

export type Task = {
    id: number;
    cookie: string;
    title: string;
    completed: boolean;
};

// handle errors
export async function getTasks(): Promise<Task[]> {
    return axios.get('/api/tasks').then((response: any) => response.data);
}

export async function deleteTask(): Promise<void> {
    return axios.delete('/api/tasks').then((res: any) => res.data);
}

export async function createTask(task: Task): Promise<Task> {
    const headers = {
        'Content-Type': 'application/json',
    };
    const json = `{"id": ${task.id}, "cookie": "${task.cookie}", "title": "${task.title}", "completed": ${task.completed}}`;
    return axios.post('/api/tasks', json, { headers }).then((res: any) => res.data);
}
