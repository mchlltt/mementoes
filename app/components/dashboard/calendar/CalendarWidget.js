// Import dependencies and components.
import React from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import EntryEvent from './EntryEvent';
import EntryEventWithTags from './EntryEventWithTags';

// Tell BigCalendar to use Moment for localization.
BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

// Create component.
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