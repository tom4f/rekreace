import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export type AlertType = {
  header: string;
  text: string;
  color?: string;
};

export type SetAlertType = Dispatch<SetStateAction<AlertType>>;

export const useAlert = (seconds = 5) => {
  const [alert, setAlert] = useState<AlertType>({ header: '', text: '' });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const delay = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (alert.header) {
      timeoutRef.current = setTimeout(() => {
        setAlert({ header: '', text: '' });
      }, seconds * 1000);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  };
  useEffect(delay, [alert, setAlert, seconds]);

  return {
    alert,
    setAlert,
  };
};
