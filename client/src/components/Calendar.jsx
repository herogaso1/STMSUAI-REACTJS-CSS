import React, { useState } from 'react';
import './Calendar.css';
import avatar1 from '../assets/Calendar/avata (1).svg';
import avatar2 from '../assets/Calendar/avata (2).svg';
import avatar3 from '../assets/Calendar/avata (3).svg';
import avatar4 from '../assets/Calendar/avata (4).svg';

const Calendar = () => {
  const [currentDate] = useState(new Date(2025, 4, 21)); // May 21, 2025
  const [view, setView] = useState('week'); // 'year', 'week', 'month', 'day'

  const avatars = {
    1: avatar1,
    2: avatar2,
    3: avatar3,
    4: avatar4
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dates = [12, 13, 14, 15, 16, 17, 18];

  // Priority colors: green (chill), yellow (work), red (urgent)
  const priorityColors = {
    low: '#10b981',      // Green - Chill
    medium: '#f59e0b',   // Yellow - Work/Normal
    high: '#ef4444'      // Red - Urgent/Warning
  };

  const events = [
    {
      id: 1,
      title: 'Shooting Stars',
      type: 'Meeting',
      priority: 'low',
      time: '09:00',
      duration: 2,
      day: 0, // Monday
      participants: [1, 2]
    },
    {
      id: 2,
      title: 'The Amazing Hubble',
      type: 'Live',
      priority: 'high',
      time: '10:00',
      duration: 2,
      day: 1, // Tuesday
      participants: [2, 3]
    },
    {
      id: 3,
      title: 'Choosing A Quality Cookware Set',
      type: 'Event',
      priority: 'medium',
      time: '10:00',
      duration: 3,
      day: 3, // Thursday
      participants: [1, 2]
    },
    {
      id: 4,
      title: 'Astronomy Binoculars A Great Alternative',
      type: 'Task',
      priority: 'medium',
      time: '09:00',
      duration: 2,
      day: 4, // Friday
      participants: [1, 2]
    },
    {
      id: 5,
      title: 'The Universe Through A Child\'s Eyes',
      type: 'Event',
      priority: 'low',
      time: '11:00',
      duration: 4,
      day: 5, // Saturday
      participants: [1, 2]
    },
    {
      id: 6,
      title: 'Choosing A Quality Cookware Set',
      type: 'Meeting',
      priority: 'high',
      time: '12:00',
      duration: 4,
      day: 2, // Wednesday
      participants: [1, 2]
    },
    {
      id: 7,
      title: 'The Amazing Hubble',
      type: 'Event',
      priority: 'low',
      time: '13:00',
      duration: 2,
      day: 3, // Thursday
      participants: [2, 3]
    },
    {
      id: 8,
      title: 'Astronomy Binoculars A Great Alternative',
      type: 'Task',
      priority: 'high',
      time: '15:00',
      duration: 2,
      day: 2, // Wednesday
      participants: [2, 3]
    },
    {
      id: 9,
      title: 'The Amazing Hubble',
      type: 'Event',
      priority: 'medium',
      time: '17:00',
      duration: 2,
      day: 0, // Monday
      participants: [1, 2]
    },
    {
      id: 10,
      title: 'Choosing A Quality Cookware Set',
      type: 'Meeting',
      priority: 'low',
      time: '16:00',
      duration: 2,
      day: 6, // Sunday
      participants: [1, 2]
    }
  ];

  const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9 AM to 8 PM

  const getDateRange = () => {
    return `May 21 - 26, 2025`;
  };

  const getEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHour = hours + duration;
    return `${endHour < 10 ? '0' + endHour : endHour}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button className="nav-btn">Today</button>
          <div className="date-nav">
            <button className="arrow-btn">‹</button>
            <span className="date-range">{getDateRange()}</span>
            <button className="arrow-btn">›</button>
          </div>
          <button className="create-btn">+ Create Event</button>
        </div>
        <div className="view-tabs">
          <button 
            className={`tab-btn ${view === 'year' ? 'active' : ''}`}
            onClick={() => setView('year')}
          >
            Year
          </button>
          <button 
            className={`tab-btn ${view === 'week' ? 'active' : ''}`}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button 
            className={`tab-btn ${view === 'month' ? 'active' : ''}`}
            onClick={() => setView('month')}
          >
            Month
          </button>
          <button 
            className={`tab-btn ${view === 'day' ? 'active' : ''}`}
            onClick={() => setView('day')}
          >
            Day
          </button>
        </div>
      </div>

      <div className="calendar-content">
        <div className="calendar-grid">
          {/* Time column */}
          <div className="time-column">
            <div className="time-header"></div>
            {hours.map(hour => (
              <div key={hour} className="time-slot">
                {hour < 12 ? `${hour}:00` : hour === 12 ? '12:00' : `${hour - 12}:00`}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((day, index) => (
            <div key={day} className="day-column">
              <div className="day-header">
                <div className="day-name">{day.slice(0, 3)}</div>
                <div className={`day-number ${index === 3 ? 'today' : ''}`}>
                  {dates[index]}
                </div>
              </div>
              <div className="day-content">
                {hours.map((hour, hourIndex) => (
                  <div key={hour} className="hour-slot"></div>
                ))}
                {/* Events */}
                {events
                  .filter(event => event.day === index)
                  .map(event => (
                    <div
                      key={event.id}
                      className={`event-card priority-${event.priority}`}
                      style={{
                        backgroundColor: priorityColors[event.priority],
                        top: `${(parseInt(event.time.split(':')[0]) - 9) * 60 + 40}px`,
                        height: `${event.duration * 60}px`
                      }}
                    >
                      <div className="event-time-badges">
                        <span className="time-badge">{formatTime(event.time)}</span>
                        <span className="time-badge">{getEndTime(event.time, event.duration)}</span>
                      </div>
                      <div className="event-title">{event.title}</div>
                      <div className="event-footer">
                        <div className="event-participants">
                          {event.participants.map((participantId, i) => (
                            <img
                              key={i}
                              src={avatars[participantId] || avatar1}
                              alt={`Participant ${participantId}`}
                              className="participant-avatar"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
