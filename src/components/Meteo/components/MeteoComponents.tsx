export const DateButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button className='text-zinc-500 hover:text-orange-400' onClick={onClick}>
    &nbsp;{children}&nbsp;
  </button>
);

export const GraphObject = ({
  src,
  altText,
}: {
  src: string;
  altText: string;
}) => (
  <object data={src} type='image/gif' className='w-full'>
    {altText}
  </object>
);
