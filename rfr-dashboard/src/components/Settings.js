import { LocalStoragePreferences } from "../util/LocalStoragePreferences";

export default function Settings() {
    let preferences = new LocalStoragePreferences();
    return (
        <div className="settings">
            <h1>Settings</h1>
            {preferences.map((preference, index) => {
                return (
                    <div key={index}> 
                        <h2>{preference.name}</h2>
                        <input type="text" value={preference.value} onChange={preference.onChange} />
                    </div>
                );
            })}
        </div>
    );
}