// import from components
import TaskItem from "./TaskItem";

// import styles specifically scoped to the TaskList.jsx component
import styles from "./TaskList.module.css";

const TaskList = ({tasks, deleteTask, updateTask, editFormActivate}) => { //destructure tasks into the list we need to render. pass in props needed i.e deleteTask, updateTask e.t.c
  return (
    <ul className={styles.tasks}>
        {
            tasks.sort((a,b) => b.id - a.id).map((task, index) => ( ////use a map to perform a function on all the items in the tasks array, create a list of tasks with their ID specifier and specific content. use sort on a.id and b.id as they (ids) are timestamps, so after typing a task, the most recently added task is added at the TOP.
                <TaskItem 
                    key={task.id}
                    task={task}
                    index={index} // Pass the index down to the TaskItem component
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    editFormActivate={editFormActivate}
                />
            )) //This past few lines is code to return the task and render it to the UI. A task item component is rendered with the delete update and edit functionality.
        }
    </ul>
  )
}

export default TaskList