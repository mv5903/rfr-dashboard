import { useEffect, useState } from 'react';
import { LocalStoragePreferences } from '../util/LocalStoragePreferences';

export default function DateTime() {
    let preferences = new LocalStoragePreferences();

    const [date, setDate] = useState({ time: '?' , date: '?' });
    const [ampm, setAmpm] = useState('pm');

    function getDayOfWeek() {
        const dayOfWeek = new Date().getDay();    
        return isNaN(dayOfWeek) ? null : 
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    }

    function getMonth() {
        const month = new Date().getMonth();    
        return isNaN(month) ? null : 
          ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];
    }

    function getDatePrefix() {
        const date = new Date().getDate();
        if (date === 1 || date === 21 || date === 31) {
            return 'st';
        } else if (date === 2 || date === 22) {
            return 'nd';
        } else if (date === 3 || date === 23) {
            return 'rd';
        } else {
            return 'th';
        }
    }

    function getTime() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const hours12 = hours % 12;
        const hoursStr = hours12 ? hours12 : 12;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        const secondsStr = seconds < 10 ? '0' + seconds : seconds;
        let time = "";
        if (preferences.getPreference('militaryTime')) {
            time += hours;
            setAmpm(null);
        } else {
            time += hoursStr;
            setAmpm(ampm);
        } 
        time += ':' + minutesStr;
        if (preferences.getPreference('showSeconds')) {
            time += ':' + secondsStr;
        }
        return time;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            const dateStr = `It's ${getDayOfWeek()}, ${getMonth()} ${date.getDate()}${getDatePrefix()}`;
            setDate({ time: getTime(), date: dateStr });
        }, 100);
        return function cleanup() {
            clearInterval(timer);
        };
    }, []);

    // This allows the am/pm to be at a decent distance from the time without it bouncing around every second. 
    // When a time is larger width wize, it will be pushed to the right by 1vw.
    let ampmoffset = 0;
    if (date.time.length === 8) {
        ampmoffset = 1;
    }

    return (
        <div className='date'>
            <h3 className="text time">{date.time}</h3>
            <h3 className="text time" style={{ left: `${ampmoffset + 10}vw` }}>{ampm ?? ''}</h3>
            <br></br>
            {
                preferences.getPreference('showDate') 
                ?
                <h3 className="text">{date.date}</h3>
                : 
                null
            }
        </div>
    );
}