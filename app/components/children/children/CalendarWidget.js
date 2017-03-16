import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

let CalendarWidget = React.createClass({
    render(){
        return (
            <BigCalendar
                {...this.props}
                views={['month', 'week', 'day']}
            />
        );
    }
});

module.exports = CalendarWidget;