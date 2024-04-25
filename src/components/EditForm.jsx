import React, {useEffect, useState} from 'react'; //use destructuring to grab both react library functionality and the usestate hook.

//HeroIcon imports for icons used
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/outline';

const EditForm = ({ editedTask,updateTask2, closedEditMode }) => { //use destructuring to call the addTask
    
    const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name); //tasks is an array of ...well..tasks, usestate initialized to an empty string array. 1 string for 1 task. Helps manage our state in the app
    const [updatedTaskDescription, setUpdatedTaskDescription] = useState(editedTask.description); //useState properties needed to assist with changing the descriptions.

    useEffect(()=> { //this snippet of code is to help with closing the edit form after clicking  outside of it or pressing whilst editing
        const closeIfEscaped = (e) => {
            e.key === "Escape" && closedEditMode();
        }

        window.addEventListener('keydown', closeIfEscaped) //check for keydown 

        return () => { //cleanup function for when the edit form is no longer displaying, remove the keydown listener and cleanup DOM keydown history
            window.removeEventListener('keydown', closeIfEscaped)
        }
    }, [closedEditMode])
    
    const handleFormSubmit = (e) => {
        e.preventDefault(); //when you normally refresh the form it refreshes the whole page when you submit the form. This says "don't worry, we'll take care of that". Prevent default mechanism.
        updateTask2({...editedTask, name: updatedTaskName, description: updatedTaskDescription}); /** for the edit form, when we click on the pencil icon we pass in the task as the new edited task
                                                            pass that to the editedTask variable, as you type, there is a localized state that updates the task name, passes it back
                                                            to App.jsx and changes its state.*/
        
    }

    return (
        <div 
            role="dialog" 
            aria-labelledby='editTask'
            onClick={(e) => {e.target === e.currentTarget && closedEditMode()}} /*take the element (e) that was clicked on. If it was the dialog (outside wrapper to the Edit form, then close edit mode)
                                                                                run the function only when clicked (arrow function to prevent automatic execution)*/
            >
            <form
                className="todo"
                onSubmit={handleFormSubmit}>
                    <div className="wrapper">
                        <input
                            type="text"
                            id="editTask"
                            className='input'
                            value={updatedTaskName} //show the value in the edit field as a task
                            onInput={(e) => setUpdatedTaskName(e.target.value)}
                            required
                            autoFocus
                            maxLength={40}
                            placeholder='Update Task'
                            />
                        <label
                            htmlFor="editTask"
                            className='label'
                        >Update Task</label>
                    </div>
                    <div className="wrapper2">
                        <textarea
                            id="editTaskDescription"
                            className='input'
                            value={updatedTaskDescription}
                            onChange={(e) => setUpdatedTaskDescription(e.target.value)}
                            maxLength={100}
                            placeholder='Update Description (optional)'
                        />
                        <label htmlFor="editTaskDescription" className='label'>update description</label>
                    </div>
                    <button
                        className='btn'
                        aria-label={`Confirm edit of task to display ${updatedTaskName}`}
                        type='submit'
                    >
                        <CheckIcon strokeWidth={2} height={24} width={24}/>
                    </button>
            </form>
        </div>
    )
}

export default EditForm
