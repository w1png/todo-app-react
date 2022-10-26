import useTasks from '../hooks/tasks';
import useCookies from '../hooks/cookies';

import TaskCard from '../components/TaskCard';
import ErrorComponent from '../components/ErrorComponent';
import LoadingComponent from '../components/LoadingComponent';
import InputForm from '../components/CreateTask';
import CreateTask from '../components/CreateTask';

const MainPage = () => {
    useCookies();
    const { tasks, error, loading, addTask } = useTasks();

    return (
        <div className='container mx-auto'>
            <h1 className='text-center mt-10'>My tasks for today:</h1>
            <div className='flex flex-wrap justify-center mt-10'>
                {loading && <LoadingComponent />}
                {error && <ErrorComponent error='Error loading tasks' />}
            </div>

            <CreateTask onCreate={addTask} />

            <div className='border-2 rounded-lg mt-5 lg:w-1/2 lg:mx-auto mr-3 ml-3 invisible' id='task_list'>
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