import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export type AlertType = {
  header: string;
  text: string;
  color?: string;
};

export type SetAlertType = Dispatch<SetStateAction<AlertType>>;

export const useAlert = (description = { header: '', text: '' }) => {
  const [alert, setAlert] = useState<AlertType>(description);

  const delay = () => {
    if (alert.header) {
      const timeout = setTimeout(() => {
        setAlert({ header: '', text: '' });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  };
  useEffect(delay, [alert, setAlert]);

  return {
    alert,
    setAlert,
  };
};
