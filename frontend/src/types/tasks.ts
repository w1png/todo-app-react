import axios from 'axios';

export type Task = {
    id: number;
    cookie: string;
    title: string;
    completed: boolean;
};

export async function getTasks(): Promise<Task[]> {
    return axios.get('/api/tasks').then((response: any) => response.data);
}

export async function deleteTask(): Promise<void> {
    return axios.delete('/api/tasks').then((res: any) => res.data);
}

export async function createTask(title: string, cookie: string): Promise<Task> {
    const headers = {
        'Content-Type': 'application/json',
    };
    const json = `{"id": 0, "cookie": "${cookie}", "title": "${title}", "completed": false}`;
    return axios.post('/api/tasks', json, { headers }).then((res: any) => res.data);
}
