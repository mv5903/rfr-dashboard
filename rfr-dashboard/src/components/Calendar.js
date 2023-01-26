import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import React from 'react';

// Had to use a class component here because I need to use setInterval to refresh the calendar
export default class Calendar extends React.Component {

    calendarRef = React.createRef();

    componentDidMount() {
        // Refresh the calendar every 10 seconds.
        const interval = 10000;
        setInterval(() => {
            try {
                this.refreshCalendar();
            } catch {
                console.warn('Calendar refresh failed. Check your internet connection.');
            }
        }, interval);
    }

    refreshCalendar() {
        let calendarApi = this.calendarRef.current.getApi();
        calendarApi.refetchEvents();
    }

    render() {
        return <div className='calendar'>
            <FullCalendar 
                views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
                plugins={[ dayGridPlugin, googleCalendarPlugin ]} 
                headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,dayGridWeek,dayGridDay' }}
                height="50vh" 
                ref={this.calendarRef}
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
                    }
                ]
            }/>
        </div> 
    }
}