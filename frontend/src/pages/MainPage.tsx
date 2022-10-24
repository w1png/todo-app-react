import { v4 as uuid } from 'uuid';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import { Task, getTasks } from "../types/tasks";
import TaskCard from '../components/TaskCard';

const MainPage = () => {
    const [cookies, setCookie] = useCookies(['user_id']);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (!cookies.user_id) {
            setCookie('user_id', uuid(), { path: '/' });
        }
    }, [cookies.user_id, setCookie]);

    useEffect(() => {
        getTasks().then((tasks) => {
            setTasks(tasks);
        });
    }, []);

    return (
        <div className='container mx-auto'>
            <h1 className='text-center mt-10'>My tasks for today:</h1>
            <div className='border-2 rounded-lg mt-5 lg:w-1/2 lg:mx-auto mr-3 ml-3'>
                {tasks.length === 0 ? (
                    <h2 className='text-center'>No tasks yet! c:</h2>
                ) : (
                    <div className="items-center">
                        {tasks.map((task) => (
                            <TaskCard task={task} />
                        ))}
                    </div>
                )}
            </div>
             
        </div>
    )
};

export default MainPage;