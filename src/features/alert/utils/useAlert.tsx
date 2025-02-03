import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export type AlertType = {
  header: string;
  text: string;
  color?: string;
};

export type SetAlertType = Dispatch<SetStateAction<AlertType>>;

export const useAlert = (seconds = 5) => {
  const [alert, setAlert] = useState<AlertType>({ header: '', text: '' });

  const delay = () => {
    if (alert.header) {
      const timeout = setTimeout(() => {
        setAlert({ header: '', text: '' });
      }, seconds * 1000);
      return () => clearTimeout(timeout);
    }
  };
  useEffect(delay, [alert, setAlert, seconds]);

  return {
    alert,
    setAlert,
  };
};
