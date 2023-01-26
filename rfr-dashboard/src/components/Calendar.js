import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { useEffect, useState } from 'react';

export default function Calendar() {

    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setForceUpdate(forceUpdate == 0 ? 1 : 0);
        }, 10000);
    });


    return (
        <div className='calendar'>
            <input type="hidden" value={forceUpdate} />
            <FullCalendar 
                defaultView="dayGridMonth" 
                views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
                plugins={[ dayGridPlugin, googleCalendarPlugin ]} 
                headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,dayGridWeek,dayGridDay' }}
                height="50vh" 
                themeSystem='bootstrap5'
                eventColor='#ff0000'
                eventTextColor='black'
                googleCalendarApiKey="AIzaSyB3L4HX12xvqOlxkMCx_x3QuAuCX_Onjwc" 
                eventSources={
                [
                    { 
                        // Team Meetings
                        googleCalendarId: 'a4ikntqcule15n32ab9k3crdg0@group.calendar.google.com' 
                    },
                    {
                        // RFR Events
                        googleCalendarId: 'tphh6dqd0df81pdfugjodnjmhc@group.calendar.google.com'
                    },
                    {
                        // RFR23 Timeline
                        googleCalendarId: '3h4u4jr9st3ptusru3cn9mogso@group.calendar.google.com'
                    },
                    {
                        // Test
                        googleCalendarId: 'aecda0916b57feb14fb7d7457f5fe8e3f43ed885b58ef7bd7745ce9cbfc65396@group.calendar.google.com'
                    }
                ]
            }/>
        </div>
    );
}