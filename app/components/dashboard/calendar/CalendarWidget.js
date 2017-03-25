import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import EntryEvent from './EntryEvent';
import EntryEventWithTags from './EntryEventWithTags';

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
                    event: EntryEventWithTags,
                    month: {
                        event: EntryEvent
                    }
                }}
            />
        );
    }
});

module.exports = CalendarWidget;