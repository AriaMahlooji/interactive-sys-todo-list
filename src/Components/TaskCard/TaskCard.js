import {React, useState} from "react";
import trash from "../../Assets/trash.svg";
import pencil from "../../Assets/pencil.svg";
import dropdown from "../../Assets/dropDown.svg";
import tick from "../../Assets/tick.svg";
import editTick from "../../Assets/submitEdit.svg";
import cancelEdit from "../../Assets/cancelEdit.svg";



import './TaskCard.css';


const TaskCard=(props)=>{

    const[isDropDown, setDropDown]=useState(false);
    const[isEditMode, setEditMode]=useState(false);
    const[editedContent, setEditedContent]=useState(props.content);

    const deleteTask=()=>{
        props.deleteTask(props.id);
    }

    const changeProgress=(event, newProgress)=>{
        event.stopPropagation();
        props.changeProgress({id:props.id,  progress:newProgress});
    }

    const editTask=()=>{
        setEditMode(!isEditMode);
        props.editTask({id:props.id, content:editedContent})
    }

    const triggerDropdown=(event)=>{
        setDropDown(!isDropDown);
    }

    return(
        <div className="taskCard">
            <div className="header">
                {!isEditMode &&<div className="header-desc">Task</div>}
                {isEditMode &&<div className="header-desc">Edit your task</div>}
                <div className="header-actions">
                    {!isEditMode &&<img alt="" src={dropdown} onClick={triggerDropdown}></img>}
                    {!isEditMode &&<img onClick={deleteTask} alt="" src={trash}></img>}
                    {!isEditMode &&<img alt="" src={pencil} onClick={()=>setEditMode(!isEditMode)}></img>}
                    {isEditMode &&<img alt="" src={cancelEdit} onClick={()=>setEditMode(!isEditMode)}></img>}
                    {isEditMode &&<img alt="" src={editTick} onClick={editTask}></img>}
                </div>
                {isDropDown && <div onMouseLeave={()=> setDropDown(!isDropDown)} className="dropdown-menu">
                    <div className={props.progress ==='todo'? "dropdown-menu-item-selected":"dropdown-menu-item"} onClick={(event)=>changeProgress(event,'todo')} >
                        <div className="is-selected">
                            {props.progress==='todo' && <img alt="" src={tick}></img>}
                        </div>
                        <div className="status-text">
                            {<span className="disabled">To Do</span>}
                        </div>
                    </div>
                    <div className={props.progress ==='inprogress'? "dropdown-menu-item-selected":"dropdown-menu-item"} onClick={(event)=>changeProgress(event,'inprogress')} >
                        <div className="is-selected">
                        {props.progress==='inprogress' && <img alt="" src={tick}></img>}
                        </div>
                        <div className="status-text">
                            <span>In Progress</span>
                        </div>
                    </div>
                    <div className={props.progress ==='completed'? "dropdown-menu-item-selected":"dropdown-menu-item"} onClick={(event)=>changeProgress(event,'completed')} >
                        <div className="is-selected">
                            {props.progress==='completed' && <img alt="" src={tick}></img>}
                        </div>
                        <div className="status-text">
                            <span>Completed</span>
                        </div>
                    </div>
                </div>}
            </div>
            <div className="body">
                <div className="content"></div>
                {!isEditMode &&<p>{props.content}</p>}
                {isEditMode &&<textarea onChange={(event)=>setEditedContent(event?.target.value)} className="footer" defaultValue={props.content}></textarea>}
            </div>
        </div>
    )
}

export default TaskCard;

