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
    Object.keys(entries).map((key) => (
      <div key={key} className='m-4 p-3 bg-light-grey'>
        <div className='text-right text-xs'>
          {typText[entries[+key].typ]} - {entries[+key].datum.slice(0, 10)}
        </div>
        <div className='text-left'>
          <b>
            {entries[+key].email ? (
              <a href={'mailto:' + entries[+key].email}>
                {entries[+key].jmeno}
              </a>
            ) : (
              entries[+key].jmeno
            )}
          </b>
        </div>
        <div className='text-left'>{entries[+key].text}</div>
      </div>
    ))
  ) : (
    <></>
  );
};
