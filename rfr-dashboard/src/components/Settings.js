import { LocalStoragePreferences } from "../util/LocalStoragePreferences";
import { useState } from "react";
import { FaCog } from "react-icons/fa";

export default function Settings() {
    const [show, setShow] = useState(false);
    const [taskTypes, setTaskTypes] = useState([]);

    let preferences = new LocalStoragePreferences();
    let keys = Object.keys(preferences.preferences);

    function populateDefaultList() {
        fetch("http://localhost:8080/tasks")
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                // Redorder tasks by originalOrder index
                data.sort((a, b) => a.orderindex - b.orderindex);
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
                console.log(taskTypes);
                setShow(true);
            }
        });
    }
    return (
        <div>
            {
                show && 
                <div className="settingsModal">
                    <h1><strong>Settings</strong></h1>
                    <p>These settings are for you only, not server-wide.</p>
                    <br></br>
                    <div className="settings">
                        {
                            keys.map((key, index) => {
                                let value = preferences.preferences[key];
                                let possibleChoices = null;
                                if (value === true || value === false) {
                                    possibleChoices = ["true", "false"];
                                }
                                let defaultValue = value === true || value === false ? `${value}` : `${value.list} - ${value.status}`;
                                return (
                                    <div key={index} className="setting">
                                        <label>{key}</label>
                                        <select defaultValue={defaultValue} onChange={(e) => { 
                                            if (e.target.value === "true" || e.target.value === "false") {
                                                preferences.updatePreference(key, e.target.value)
                                            } else {
                                                let list = e.target.value.split(" - ")[0];
                                                let status = e.target.value.split(" - ")[1];
                                                preferences.updatePreference(key, {"list": list, "status": status});
                                            }
                                        }}>
                                            {
                                                value === true || value === false
                                                ?
                                                possibleChoices.map((choice, index) => {
                                                    return (
                                                        <option value={choice} key={index}>{choice}</option>
                                                    );
                                                })
                                                :
                                                taskTypes.map((type, index) => {
                                                    return (
                                                        <option value={type.list + " - " + type.status} key={index}>{type.list + " - " + type.status}</option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <button className="settingsClose" onClick={() => { setShow(false); window.location.reload();}}>Save and Close</button>
                </div>
            }   
            <FaCog className="settingsIcon" onClick={() => populateDefaultList()}>Click me</FaCog>
        </div>
      );
}