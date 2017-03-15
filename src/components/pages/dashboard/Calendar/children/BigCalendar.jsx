import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from './events';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

let Basic = React.createClass({
    render(){
        return (
            <BigCalendar
                {...this.props}
                events={events}
                views={['month']}
            />
        );
    }
});

export default Basic;