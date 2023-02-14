export class LocalStoragePreferences {
    preferences;

    constructor() {
        // Attempt to laod preferences from local storage. If not found, create a new object.
        if (localStorage.getItem('preferences')) {
            this.preferences = JSON.parse(localStorage.getItem('preferences'));
        } else {
            this.preferences = this.defaultPreferences();
            localStorage.setItem('preferences', JSON.stringify(this.preferences));

        }
    }

    defaultPreferences() {
        return {
            "unitsMetric": false,
            "showSeconds": true,
            "militaryTime": false,
            "showDate": true,
            "showHighLowTemp": true,
            "showProgressBars": true,
            "defaultList": {
                "list": "Driving Car",
                "status": "in progress"
            }
        }
    }

    updatePreference(key, value) {
        // Check if key exists in preferences object
        if (!this.preferences.hasOwnProperty(key)) {
            console.error(`Key ${key} does not exist in preferences object.`);
            return;
        }
        if (value == "true" || value == "false") {
            value = value == "true";
        }
        // Check that value is of the same type as the existing value
        if (typeof value !== typeof this.preferences[key]) {
            console.error(`Value ${value} is not of the same type as existing value ${this.preferences[key]}.`);
            return;
        }
        // Update the value
        this.preferences[key] = value;
        // Save the preferences to local storage
        localStorage.setItem('preferences', JSON.stringify(this.preferences));
    }

    getPreference(key) {
        // Check if key exists in preferences object
        if (!this.preferences.hasOwnProperty(key)) {
            console.error(`Key ${key} does not exist in preferences object.`);
            return;
        }
        return this.preferences[key];
    }
}