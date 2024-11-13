import React, { useState } from 'react';

const SchedulePost: React.FC<{ onSchedule: (date: Date) => void }> = ({ onSchedule }) => {
  const [date, setDate] = useState<Date | null>(null);

  const handleSchedule = () => {
    if (date) {
      onSchedule(date);
    }
  };

  return (
    <div>
      <h3>Set Post Time</h3>
      <input type="datetime-local" onChange={(e) => setDate(new Date(e.target.value))} />
      <button onClick={handleSchedule}>Schedule</button>
    </div>
  );
};

export default SchedulePost;