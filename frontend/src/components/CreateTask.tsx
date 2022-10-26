import { Label } from "flowbite-react";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";

import { createTask, Task } from "../types/tasks";
import ErrorComponent from "./ErrorComponent";

type CreateTaskProps = {
    onCreate: (task: Task) => void;
};

const CreateTask = ({onCreate}: CreateTaskProps) => {
    const [taskName, setTaskName] = useState('');
    const [error, setError] = useState(false);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
       setTaskName(e.target.value);
       console.log(taskName)
    }

    const onClickAdd = () => {
        if (taskName.trim().length == 0) {
            return setError(true);
        }
        createTask(
            taskName,
            new Cookies().get('user_id')
        ).then((task) => {
            setTaskName('');
            setError(false);
            onCreate(task);
        }).catch((err) => {
            setError(true);
        });
    }
    
    useEffect(() => {
        console.log(taskName);
    }, []);

    return (
        <>
            <div className='flex justify-center mt-5'>
                <div className='flex flex-col'>
                    <Label value='Task Name' color="gray"/>
                    <input className='border-2 border-gray-300 p-2 rounded-md' type='text' value={taskName} onChange={onChangeInput} />
                    {error && <ErrorComponent error='Error creating task' size="sm"/>}
                    <button className='border-2 bg-gray-200 hover:bg-gray-100 text-gray-400 font-bold py-2 px-4 rounded mt-2' onClick={onClickAdd}>Add</button>

                </div>
            </div>
        </>
    )
};

export default CreateTask;
