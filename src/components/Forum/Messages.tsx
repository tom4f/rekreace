import { OneMessage } from '../../features/forum/hooks';

type MessagesType = {
  entries: OneMessage[];
};

export const Messages = ({ entries }: MessagesType) => {
  const typText = [
    'Fórum',
    'Inzerce',
    'Seznamka',
    'K obsahu stránek',
    'noname4',
    'noname5',
    'noname6',
    'noname7',
    'Kaliště 993m n.m.',
  ];

  return entries.length ? (
    entries.map((message) => (
      <div key={message.id} className='m-4 p-3 bg-light-grey rounded-md'>
        <div className='text-right text-xs'>
          {typText[message.typ]} - {message.datum.slice(0, 10)}
        </div>
        <div className='text-left'>
          <b>
            {message.email ? (
              <a href={'mailto:' + message.email}>{message.jmeno}</a>
            ) : (
              message.jmeno
            )}
          </b>
        </div>
        <div className='text-left'>{message.text}</div>
      </div>
    ))
  ) : (
    <></>
  );
};
