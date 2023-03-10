import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import React from 'react';
import { SECRETS } from '../secrets';

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
        return (
            <div className='calendar'>
                <FullCalendar 
                    views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
                    plugins={[ dayGridPlugin, googleCalendarPlugin ]} 
                    headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,dayGridWeek,dayGridDay' }}
                    height="60vh" 
                    ref={this.calendarRef}
                    themeSystem='bootstrap5'
                    eventColor='#ff0000'
                    eventTextColor='black'
                    dayMaxEventRows={3}
                    googleCalendarApiKey={SECRETS.googleCalendarAPIKey}
                    eventSources={SECRETS.googleCalendars.map((calendar) => {
                        return {
                            googleCalendarId: calendar.id,
                            color: calendar.color,
                        }
                    })
                }/>
                <div className="flex" style={{marginTop: '2vh'}}>
                    {SECRETS.googleCalendars.map((calendar, index) => {
                        return (
                            <div className="flex" key={index}>
                                <p className='text legend' style={{backgroundColor: calendar.color }}><strong>{calendar.name}</strong></p>
                            </div>
                        );
                    })}
                </div>
            </div> 
        );
    }
}