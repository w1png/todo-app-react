import { Task } from "../types/tasks";

type TaskCardProps = {
    task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
    return (
        <p>{task.title}</p>
    )
}

export default TaskCard;
