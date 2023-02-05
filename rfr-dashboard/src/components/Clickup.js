import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";

export default function Clickup() {

    function titleCase(str) {
        return str.split(' ').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' ');
    }

    function setTaskState(event) {
        setTaskType(event.target.value);
    }

    const [tasks, setTasks] = useState([]);
    const [taskTypes, setTaskTypes] = useState([]);
    const [taskType, setTaskType] = useState("in progress");

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("http://localhost:8080/tasks")
                .then(response => response.json())
                .then(data => {
                    if (data.tasks) {
                        setTasks(data.tasks);
                        setTaskTypes(data.tasks.map((task) => task.status.status).filter((value, index, self) => self.indexOf(value) === index));
                    }
                });
        }, 5000);
        return () => clearInterval(interval);
    });

    return (
        <div className="clickup">
            { 
                taskTypes.length > 0 
                ?
                <div className="clickup-dropdown">
                    <select className="form-select" onChange={setTaskState} defaultValue={taskType}>
                        {taskTypes.map((type, index) => {
                            return (
                                <option value={type} key={index}>{titleCase(type)}</option>
                            );
                        })}
                    </select>
                </div>
                :
                <h3 className="clickup-loading">Loading...</h3>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"><p>Task</p></th>
                        <th scope="col"><p>Progress</p></th>
                        <th scope="col"><p>Assignee(s)</p></th>
                        <th scope="col"><p>Due Date</p></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, rowIndex) => {
                        if (task.status.status === taskType) {
                            const progress = task.custom_fields.find((field) => field.name === "Progress").value.percent_complete ?? 0;
                            const asignees = task.assignees ?? [];
                            const dueDate = new Date(parseInt(task.due_date));
                            return (
                                <tr key={rowIndex}>
                                    <td><p>{task.name}</p></td>
                                    <td><ProgressBar striped varient="success" now={progress} label={`${progress}%`}/></td>
                                    <td>
                                        <div className="assignees">
                                            {asignees.map((asignee, index) => {
                                                return (
                                                    <div className="assignee" key={index} style={{backgroundColor: asignee.color}} title={asignee.username}>{asignee.initials}</div>
                                                )
                                            })}
                                        </div>
                                    </td>
                                    <td><p style={{ color: dueDate <= new Date() ? 'red' : 'white' }}>{dueDate.toLocaleDateString()}</p></td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
        </div>
    );
}
