export const AlertBox = ({
  alert: { header = '', text = '', color = 'red' },
  ...props
}) => {
  return header ? (
    <article style={{ textAlign: 'center', margin: '0' }} {...props}>
      <header style={{ color, fontSize: '30px' }}>{header}</header>
      <header style={{ color, fontSize: '20px' }}>{text}</header>
    </article>
  ) : (
    <></>
  );
};
