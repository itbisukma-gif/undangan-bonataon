'use client';

import { useState, useEffect } from 'react';

type CountdownTimerProps = {
  targetDate: string;
};

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const calculateTimeLeft = () => {
    // Ensure the date is parsed correctly with timezone information
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  // No need for isClient state anymore if we initialize timeLeft with calculateTimeLeft
  useEffect(() => {
    // Set initial time left
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);


  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center space-x-4">
      {timeUnits.map((unit, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="text-4xl font-bold text-white">
            {String(unit.value).padStart(2, '0')}
          </div>
          <div className="text-sm uppercase text-white/80">{unit.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
