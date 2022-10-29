import { useState, useEffect } from "react";
import { Task, setTaskCompleted } from "../types/tasks";

type TaskCardProps = {
    task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
    // make button with text=task.title and onClick=completeTask(task.id) 
    // when button is pressed underline the text
    // if button is pressed and task is already completed then remove underline and make it uncompleted
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        setCompleted(task.completed);
    }
    , [task.completed]);

    const handleComplete = () => {
        setTaskCompleted(task.id, !completed);
        setCompleted(!completed);
    }

    return (
        <div className='flex flex-col justify-center items-center border-[1px] p-3'>
            <button onClick={handleComplete} style={{ textDecoration: completed ? "line-through" : "none" }}>
                {task.title}
            </button>
        </div>
    );
};

export default TaskCard;
