import { useEffect, useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify'; //for alerts from toastify
import 'react-toastify/dist/ReactToastify.css';


// CUSTOM COMPONENTS
import MyCustomForm from './components/MyCustomForm'
import TaskList from './components/TaskList';
import EditForm from './components/EditForm';

// CUSTOM HOOKS
import useLocalStorage from './hooks/useLocalStorage'




function App() {
  //states we need
  const [tasks, setTasks] = useLocalStorage('myreact-todo.tasks',[]); /*SHARED STATE FOR THE APP, previously was  = useState([]) which created an empty array after every page refresh, now its = 
                                          useLocalStorage('react-todo.tasks', []); our custom hook to help with persistent storage*/
  const [editedTask, setEditedTask] = useState(null); //for the edited task state
  const [isEditing, setIsEditing] = useState(false); //for the editing state when in EditForm
  const [previousFocusElement, setPreviousFocusElement] = useState(null);
  const [taskDescription, setTaskDescription] = useState(''); // Define setTaskDescription here

  const addTask = (task) => {
    setTasks(previousState => [...previousState, {...task, description: taskDescription}]); //decompose, spread previous
    toast.success("New Task Added");
    setTaskDescription("");
  }

  const deleteTask = (id) => {
    setTasks(updatedTasks => updatedTasks.filter(t => t.id !== id));
    toast.success("Task Deleted");
  }

  const updateTask = (id) => {
    setTasks(previousState => previousState.map(t => t.id === id ? {...t, checked: !t.checked} : t)) /**if equal to the ID, take that object t, and spread all the properties of whatever that task was.
                                                                                                    Update the checked property on that object and update it to whatever the opposite of 
                                                                                                    t.checked is (true or false) currently. If it is the same as the ID passed in the function
                                                                                                    update only the checked property, if not, just return the task.*/
                                                                                                    
  }

  const updateTask2 = (task) => { //toggle called for the editForm
    setTasks(previousState => previousState.map(t => (t.id === task.id ? {...t, name: task.name, description: task.description} : t))) /**if the t.id = task.id, update the checked status of the name if equal to the ID, take that object t, and spread all the properties of whatever that task was.
                                                                                                    Update the checked property on that object and update it to whatever the opposite of 
                                                                                                    t.checked is (true or false) currently. If it is the same as the ID passed in the function
                                                                                                    update only the checked property, if not, just return the task.*/
    toast.success("Task Updated");
    closeEditMode();                                                                                                
    ///close the edit mode                                                                                          
  }

  const closeEditMode = () =>{
    setIsEditing(false);
    previousFocusElement.focus();
  }

  const editFormActivate = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusElement(document.activeElement);
  }

  const countCompletedTasks = () => { //function to count completed or checked tasks
    // Filter the tasks array to get only the tasks that are checked
    const completedTasks = tasks.filter(task => task.checked);
    
    // Return the length of the filtered array, which represents the number of completed tasks
    return completedTasks.length;
  }

  function getMessage(){
    const percentage = completedTaskCount/totalTasks * 100;
    //if nothing has been done - 0 * 100 = 0
    if (percentage === 0) {
      return 'Try to do at least one task 😣';
    } else if (percentage === 100) { //if all complete
      return 'Great Job! You completed all the tasks 😎'
    }
    return 'Keep it up! 🏃‍♂️💨 ';
  }

  useEffect(() =>{
    if(completedTaskCount === totalTasks && totalTasks > 0){
      toast.success('All Tasks Completed!');
    }
  })

  // constant to hold number of completed tasks
  const completedTaskCount = countCompletedTasks();

  // Calculate the total number of tasks
  const totalTasks = tasks.length;

  return (
    <div className="container">
      <header>
        <h1>MMS ToDo App 📝</h1>
        {
          tasks.length > 0 && ( //only if there is at least 1 task, show this h2 
            <h2>
              <br />
              <span className={completedTaskCount === totalTasks ? 'total-count':'completed-count'}>
                {completedTaskCount}
              </span>/
              <span className="total-count">{totalTasks}</span> Tasks Complete
              <h5>{getMessage()}</h5>
            </h2>
          )
        }
      </header>
      <ToastContainer/>
      {
        isEditing && (
          <EditForm 
            editedTask={editedTask}
            updateTask2={updateTask2}
            closedEditMode={closeEditMode}
          />
        ) 
      }
      <MyCustomForm addTask={addTask} taskDescription={taskDescription} setTaskDescription={setTaskDescription} /> 
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask} //use prop drilling
          updateTask={updateTask}
          editFormActivate={editFormActivate}
        />
      )}
    </div>
  )
}

export default App
