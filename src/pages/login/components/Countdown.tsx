import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

interface CountdownProps {
  initialTime: number;
  onComplete?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ initialTime, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <Typography variant="body2" color="textSecondary">
      OTP expires in: {timeLeft}s
    </Typography>
  );
};

export default Countdown;
