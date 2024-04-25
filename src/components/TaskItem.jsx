// import styles specifically scoped to the TaskItem.jsx component
import { useState } from "react";
import styles from "./TaskItem.module.css";

//HeroIcon imports for icons used
import { CheckIcon, TrashIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'

const TaskItem = ({ task, deleteTask, updateTask, editFormActivate }) => {
    const [isChecked, setIsChecked] = useState(task.checked);

    const handleCheckboxChange = (e) =>{
        setIsChecked(!isChecked);
        updateTask(task.id);
    }

    return (
        <li className={styles.task}>
            <div className="task-group">
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={isChecked}/*check the task property from the DOM to 
                                        see whether it has been checked on the list*/
                    onChange={handleCheckboxChange}
                    name={task.name}
                    id={task.id}
                />
                <label
                    htmlFor={task.id}
                    className={styles.label}
                >
                    {task.name}
                    {task.description && (
                        <p className={styles.description}>{task.description}</p>
                    )} {/* Display description if it exists */}
                </label>
                
            </div>
            <div className={styles["task-group"]}>
                <button
                    className={`btn`}
                    aria-label={`Update the task: ${task.name}`}
                    onClick={() => editFormActivate(task)}
                >
                    <PencilIcon width={24} height={24}/>
                </button>

                <button
                    className={`btn ${styles.delete}`} //modular reference to delete class styles
                    aria-label={`Delete the task: ${task.name}`}
                    onClick={() => deleteTask(task.id)} /*when we click the delete button, submit the current item's 
                                                        ID to the function and call the delete function for that ID. 
                                                        Arrow function is used to prevent delete method from being 
                                                        called immediately after adding a task and ONLY upon clicking delete button.*/
                >
                    <TrashIcon width={24} height={24}/>
                </button>

            </div>
        </li>
    )
}

export default TaskItem