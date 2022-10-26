import { useState, useEffect } from "react";
import { getTasks, Task } from "../types/tasks";

const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const addTask = (task: Task) => {
        setTasks([...tasks, task]);
    };

    useEffect(() => {
        getTasks().then((tasks) => {
            setTasks(tasks);
            setLoading(false);
            document.getElementById('task_list')?.classList.remove('invisible');
        }).catch((err) => {
            setError(true);
            setLoading(false);
        });
    }, []);

    return { tasks, loading, error, addTask };
};

export default useTasks;
