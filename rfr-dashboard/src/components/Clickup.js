import { useEffect, useState } from "react";
import ClickupTask from "./ClickupTask";

export default function Clickup() {
    const [tasks, setTasks] = useState([]);
    const [taskTypes, setTaskTypes] = useState([]);
    const [taskType, setTaskType] = useState({"list": "Driving Car", "status": "in progress"});
    const [showSubtasks, setShowSubtasks] = useState([]);

    function setTaskState(event) {
        let type = JSON.parse(event.target.value);
        setTaskType({"list": type.list, "status": type.status});
    }

    function showSubtask(id) {
        let newShowSubtasks = [...showSubtasks];
        const index = newShowSubtasks.indexOf(id);
        if (index > -1) { // only splice array when item is found
            newShowSubtasks.splice(index, 1); // 2nd parameter means remove one item only
        } else {
            newShowSubtasks.push(id);
        }
        setShowSubtasks(newShowSubtasks);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("http://localhost:8080/tasks")
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        // Redorder tasks by originalOrder index
                        data.sort((a, b) => a.orderindex - b.orderindex);
                        setTasks(data);
                        // Get lists
                        let types = [];
                        data.forEach(task => {
                            let found = false;
                            types.forEach(type => {
                                if (type.list === task.list.name && type.status === task.status.status) {
                                    found = true;
                                }
                            })
                            if (!found && !task.parent) {
                                types.push({"list": task.list.name, "status": task.status.status});
                            }
                        });
                        types.sort((a,b) => (a.list > b.list) ? 1 : ((b.list > a.list) ? -1 : 0))
                        setTaskTypes(types);
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
                    <select className="form-select" onChange={setTaskState} defaultValue={JSON.stringify(taskType)}>
                        {taskTypes.map((type, index) => {
                            return (
                                <option value={JSON.stringify(type)} key={index}>{`${type.list}: ${type.status}`}</option>
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
                        <th></th>
                        <th scope="col"><p>Task</p></th>
                        <th scope="col"><p>Progress</p></th>
                        <th scope="col"><p>Assignee(s)</p></th>
                        <th scope="col"><p>Due Date</p></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, rowIndex) => {
                        const props = {
                            task: task,
                            tasks: tasks,
                            takeType: taskType,
                            showSubtasks: showSubtasks,
                            showSubtask: showSubtask,
                            isSubtask: false
                        }
                        if (!task.parent && task.list.name === taskType.list && task.status.status === taskType.status) {
                            return (
                                <>
                                    <ClickupTask {...props} key={rowIndex} />
                                    {
                                        showSubtasks.includes(task.id) && tasks.map((subtask, subtaskIndex) => {
                                            const subtaskProps = {
                                                task: subtask,
                                                takeType: taskType,
                                                showSubtasks: showSubtasks,
                                                showSubtask: showSubtask,
                                                isSubtask: true
                                            }
                                            if (subtask.parent && subtask.parent === task.id) {
                                                return (
                                                    <ClickupTask {...subtaskProps} key={subtaskIndex} />
                                                );
                                            }
                                            return null;
                                        })
                                    }
                                </>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
        </div>
    );
}
