import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles/calendar.css';

import Event from './children/Event';
import EventWithTags from './children/EventWithTags';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

let CalendarWidget = React.createClass({
    render(){
        return (
            <BigCalendar
                {...this.props}
                views={['month', 'week', 'day']}
                components={{
                    event: EventWithTags,
                    month: {
                        event: Event
                    }
                }}
            />
        );
    }
});

module.exports = CalendarWidget;