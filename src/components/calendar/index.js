import React from "react";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay"; // Import getDay function
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventWithTooltip from "./eventTooltip";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    "en-US": require("date-fns/locale/en-US"),
  },
  timeZone: "Asia/Manila",
});

const views = {
  month: true,
  agenda: true,
  week: false,
  day: false,
};

const handleViewChange = (view) => {
  console.log(`Switched to view: ${view}`);
};

const Calendar = ({ events }) => {
  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 700, marginTop: "50px" }}
      views={views}
      onView={handleViewChange}
      components={{
        event: EventWithTooltip,
      }}
    />
  );
};

export default Calendar;
