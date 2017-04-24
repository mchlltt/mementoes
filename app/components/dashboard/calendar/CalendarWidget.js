// Import dependencies and components.
import React from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import EntryEvent from './EntryEvent';
import EntryEventWithTags from './EntryEventWithTags';
import {browserHistory} from 'react-router';

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
                selectable="ignoreEvents"
                views={['month', 'week', 'day']}
                onSelectSlot={slotInfo => browserHistory.push({
                    pathname: '/dashboard/new/' + slotInfo.start.toISOString().split('T')[0]
                })}
                components={{
                    event: EntryEventWithTags,
                    // Don't show tags in Month view.
                    month: {event: EntryEvent}
                }}
            />
        );
    }
});

module.exports = CalendarWidget;