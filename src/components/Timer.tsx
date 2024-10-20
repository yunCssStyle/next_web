import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

type TimerProps = {
  timeAction: () => void;
  trigger: boolean;
};
const Timer = (props: TimerProps) => {
  const { timeAction, trigger } = props;
  const [time, setTime] = useState(60);

  useEffect(() => {
    if (trigger === true) {
      //timer start
      const timer = setInterval(() => {
        setTime((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            timeAction();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <TimerStyle>
      {time < 10 && 0}
      {time}
    </TimerStyle>
  );
};

export const TimerStyle = styled.span`
  display: block;
  text-align: center;
  width: 18px;
`;
