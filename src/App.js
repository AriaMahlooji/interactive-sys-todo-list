import './App.css';
import axios from "axios";

import ProgressCard from './Components/ProgressCard/ProgressCard';
import { useState, useEffect } from 'react';

function App() {
  const[_tasks,setTasks]= useState([{}]);
  
  //axios.get('http://localhost:3333/tasks').then(res=> console.log(res.data));

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3333/tasks',
      );

      setTasks(result.data);
    };

    fetchData();
  }, []);

  const deleteTask=(id)=>{
    axios.delete("http://localhost:3333/tasks/"+ id).then(response => setTasks(response.data));
  
  }

  const addTask=(content)=>{
    axios.post("http://localhost:3333/tasks/", {content:content}).then(response => setTasks(response.data));
  }

  const changeProgress=(id_progress)=>{
      axios.put("http://localhost:3333/tasks/"+ id_progress.id, {progress:id_progress.progress}).then(response => setTasks(response.data));
      
  }

  const editTask=(id_content)=>{
      axios.put("http://localhost:3333/tasks/"+ id_content.id, {content:id_content.content}).then(response => setTasks(response.data));
  }

  let todoTasks = _tasks.filter(task=> task.progress === "todo").reverse();
  let inProgressTasks = _tasks.filter(task=> task.progress === "inprogress").reverse();
  let completedTasks = _tasks.filter(task=> task.progress === "completed").reverse();
  return (
    <div className="App">
      <div className="header">
        <h3>todo-list app</h3>
      </div>
      <div className="body">
        <div className="progress_queues_container">
          <ProgressCard editTask={editTask} changeProgress={changeProgress} addTask={addTask} addTaskAbility={true} deleteTask={deleteTask} title="to do" tasks={todoTasks}/>
          <ProgressCard editTask={editTask} changeProgress={changeProgress} deleteTask={deleteTask} title="in progress" tasks={inProgressTasks}/>
          <ProgressCard editTask={editTask} changeProgress={changeProgress} deleteTask={deleteTask} title="completed" tasks={completedTasks}/>
        </div>
      </div>
    </div>
  );
}


export default App;
