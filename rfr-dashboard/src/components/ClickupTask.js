import { ProgressBar } from "react-bootstrap";
import { FaCaretRight, FaCaretDown } from "react-icons/fa";
import { LocalStoragePreferences } from '../util/LocalStoragePreferences';

export default function ClickupTask({ task, tasks, showSubtasks, showSubtask, isSubtask }) {
    let preferences = new LocalStoragePreferences();
    const progress = (task.custom_fields.find((field) => field.type === "automatic_progress").value.percent_complete).toFixed(1) ?? 0;
    const asignees = task.assignees ?? [];
    const dueDate = task.due_date ? new Date(parseInt(task.due_date)).toLocaleDateString() : 'N/A';
    const dueDatePassed = task.due_date ? new Date(parseInt(task.due_date)) <= new Date() : false;
    return (
        <>
            <tr>
                {
                    isSubtask || tasks.find((t) => t.parent === task.id) === undefined
                    ?
                    <td></td>
                    :
                    <td className="caretCustom" onClick={() => showSubtask(task.id)}>
                        {
                            showSubtasks.includes(task.id) 
                            ?
                            <FaCaretDown size={20} />
                            :
                            <FaCaretRight size={20} />
                        }
                    </td>
                }
                {
                    isSubtask
                    ?
                    <td><p><i><a href={task.url} target="_blank" rel="noreferrer" style={{color: 'white'}}>{task.name}</a></i></p></td>
                    :
                    <td><p><strong><a href={task.url} target="_blank" rel="noreferrer" style={{color: 'white'}}>{task.name}</a></strong></p></td>
                }
                <td>
                    {
                        preferences.getPreference("showProgressBars")
                        ?
                        <ProgressBar striped varient="success" now={progress} label={`${progress}%`} />
                        :
                        <p>{progress}%</p>
                    }
                </td>
                <td>
                    <div className="assignees">
                        {asignees.map((asignee, index) => {
                            return (
                                <div className="assignee" key={index} style={{backgroundColor: asignee.color}} title={asignee.username}>{asignee.initials}</div>
                            );
                        })}
                    </div>
                </td>
                <td><p style={{ color: dueDatePassed ? 'red' : 'white' }}>{dueDate}</p></td>
            </tr>
        </>
    );
}