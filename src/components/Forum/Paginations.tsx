import { ForumParams } from '../../pages/Forum';
import { ForumResponse } from '../../features/forum/hooks';
import { useState } from 'react';

type PaginationsType = {
  begin: number;
  postsPerPage: number;
  setForum: React.Dispatch<React.SetStateAction<ForumParams>>;
  paginateSize: number;
  next: number;
  filteredEntries: ForumResponse;
};

export const Paginations = ({
  begin,
  postsPerPage,
  setForum,
  paginateSize,
  next,
  filteredEntries,
}: PaginationsType) => {
  const [buttonText, setButtonText] = useState('0');

  const lastPage = filteredEntries?.length;
  const pageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const buttonTarget = event.target as HTMLButtonElement;
    const buttonTextClicked =
      buttonTarget.textContent || buttonTarget.innerText;
    let myButtonText = 0;
    const buttonsDom = buttonTarget.parentElement?.children;

    if (+buttonTextClicked >= 0 && buttonsDom) {
      begin = +buttonTextClicked * postsPerPage;

      buttonsDom[Number(buttonText)].classList.replace(
        'bg-green-600',
        'bg-light-grey'
      );

      buttonTarget.classList.replace('bg-light-grey', 'bg-green-600');
      myButtonText = +buttonTextClicked;
    }

    if (buttonTextClicked === 'next') {
      myButtonText = 0;
      if (next < lastPage / postsPerPage - paginateSize) {
        next += paginateSize;
        begin = postsPerPage * next;
      }
    }

    if (buttonTextClicked === 'prev') {
      myButtonText = 0;
      if (next > paginateSize - 1) {
        next -= paginateSize;
        begin = postsPerPage * next;
      }
    }
    setForum((old: ForumParams) => ({
      ...old,
      begin: begin,
      next: next,
    }));

    setButtonText(myButtonText.toString());
  };

  const showPagination = () => {
    const buttonPageList = [];
    for (let i = next; i < lastPage / postsPerPage; i++) {
      if (i < next + paginateSize) {
        buttonPageList.push(
          <button
            // set background-color for 1st button
            className={`text-xs w-8 h-8 cursor-pointer hover:bg-green-600 rounded-2xl ${
              i === next ? 'bg-green-600' : 'bg-light-grey'
            }`}
            key={i}
            onClick={(e) => pageButtonClick(e)}
          >
            {i}
          </button>
        );
      }
    }
    return buttonPageList;
  };

  return (
    <div className='pb-10 px-4 flex justify-center'>
      <button
        className='bg-light-grey text-xs w-8 h-8 cursor-pointer rounded-2xl'
        onClick={(e) => pageButtonClick(e)}
      >
        prev
      </button>
      <span>{showPagination()}</span>
      <button
        className='bg-light-grey text-xs w-8 h-8 cursor-pointer rounded-2xl'
        onClick={(e) => pageButtonClick(e)}
      >
        next
      </button>
    </div>
  );
};
