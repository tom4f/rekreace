import { Header } from 'components/Atoms';
import { useGetForum } from 'features/forum';
import { NavLink } from 'react-router-dom';

export const Forum = ({
  searchCriteria = '',
  showHeader = true,
}: {
  searchCriteria?: string;
  showHeader?: boolean;
}) => {
  const { data, isSuccess } = useGetForum({
    start: 0,
    limit: 5,
    searchCriteria,
  });

  if (!isSuccess || !Array.isArray(data)) {
    return null;
  }

  const showForum = () => {
    return data.map((item) => {
      const { id, text, jmeno, email } = item;
      return (
        <div key={id} className='flex flex-wrap justify-start'>
          <div className='w-1/12 overflow-hidden text-clip whitespace-nowrap'>
            <b>
              {email ? <a href={`mailto:${email}`}>{jmeno}</a> : <>{jmeno}</>}
            </b>
          </div>
          <div className='w-11/12 overflow-hidden text-ellipsis whitespace-nowrap px-3'>
            {text}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {showHeader && (
        <Header>
          <NavLink to='/forum'>LIPNO FÓRUM</NavLink>
        </Header>
      )}

      <section className='bg-slate-200 text-black text-xs p-3 '>
        {showForum()}
      </section>
    </>
  );
};
