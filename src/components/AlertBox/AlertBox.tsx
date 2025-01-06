import { useEffect } from 'react';

export const AlertBox = ({
  alert: { header = '', text = '', color = 'red' },
  ...props
}) => {
  return header ? (
    <article
      className='alert'
      style={{ color, textAlign: 'center', margin: '0' }}
      {...props}
    >
      <header style={{ fontSize: '30px' }}>{header}</header>
      <header style={{ fontSize: '20px' }}>{text}</header>
    </article>
  ) : (
    <></>
  );
};

export const Delay = (
  alert = { header: '', text: '' },
  setAlert: Function
): void => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(alert);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [alert, setAlert]);
};
