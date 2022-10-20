import { v4 as uuid } from 'uuid';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import { Task, getTasks, createTask } from "../types/tasks";
import CookiePopup from '../components/CookiePopup';

import { Button, TextInput } from "flowbite-react";

const MainPage = () => {
    const [cookies, setCookie] = useCookies(['user_id']);
    if (!cookies.user_id) {
        setCookie('user_id', uuid(), { path: '/' });
    }

    const [ tasks, setTasks ] = useState<Task[]>([]);
    useEffect(() => {
        getTasks()
            .then((tasks: Task[]) => {
                setTasks(tasks);
            });
    }, []);
    const createTaskClick = () => {
        const title = (document.getElementById("task") as HTMLInputElement).value;
        const task: Task = {
            id: 0,
            title: title,
            cookie: cookies.user_id,
            completed: false,
        };
        createTask(task).then(data => console.log(data));
    }

    const [cookiePopup, setCookiePopup] = useCookies(['cookies_accepted']);
    useEffect (() => {
        const interval = setInterval(() => {
            var cookiePopup = document.getElementById('cookiePopup');
            if (cookiePopup && cookiePopup.style.display == 'none') {
                setCookiePopup('cookies_accepted', true, { path: '/' });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {!cookiePopup.cookies_accepted && <CookiePopup />}
            <TextInput
                id='task'
                placeholder='Task title'
            />
            <Button
                onClick={createTaskClick}
            >Submit</Button>

            <br />
            <h1>Tasks</h1>
            <ul>
                {tasks.map((task: Task) => (
                    <li key={task.id}>{task.completed ? '✅' : '❌'} {task.title}</li>
                ))}
            </ul>
        </div>  
    )
};

export default MainPage;