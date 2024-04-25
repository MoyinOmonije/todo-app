import React, {useState} from 'react'; //use destructuring to grab both react library functionality and the usestate hook.

//HeroIcon imports for icons used
import { PlusCircleIcon } from '@heroicons/react/24/solid'

const MyCustomForm = ({ addTask, taskDescription, setTaskDescription }) => { //use destructuring to call the addTask
    const [tasks, setTasks] = useState(""); //tasks is an array of ...well..tasks, usestate initialized to an empty string array. 1 string for 1 task. Helps manage our state in the app
    //const [taskDescription, setTaskDescription] = useState(''); // State variable for task description

    const handleFormSubmit = (e) => {
        e.preventDefault(); //when you normally refresh the form it refreshes the whole page when you submit the form. This says "don't worry, we'll take care of that". Prevent default mechanism.
        addTask({
            name: tasks,
            description: taskDescription,
            checked: false,
            id: Date.now()
        });
        setTasks("");
        setTaskDescription("");
    }

    return (
        <form
            className="todo"
            onSubmit={handleFormSubmit}> 
                <div className="wrapper">
                    <input 
                        type="text" 
                        id="tasks"
                        className='input'
                        value={tasks} //show the value in the input field as a task
                        onInput={(e) => setTasks(e.target.value)}
                        required
                        autoFocus
                        maxLength={40}
                        placeholder='Enter A Task.....'
                        />
                    <label 
                        htmlFor="tasks"
                        className='label'
                    >Enter A Task</label>
                </div>
                <div className="wrapper2">
                    <textarea
                        id="taskDescription"
                        className='input'
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        maxLength={100} // Adjust as needed
                        placeholder='description (optional)'
                    />
                    <label
                        htmlFor="taskDescription"
                        className='label'
                    >description (optional)</label>
                </div>
                <button
                    className='btn'
                    aria-label='Add Task'
                    type='submit'
                >
                    <PlusCircleIcon />
                </button>
        </form>
    )
}

export default MyCustomForm
