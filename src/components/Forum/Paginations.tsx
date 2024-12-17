import { ForumParams } from '../../pages/Forum';
import { ForumResponse } from '../../features/forum/hooks';

type PaginationsType = {
  begin: number;
  postsPerPage: number;
  paginate: React.Dispatch<React.SetStateAction<ForumParams>>;
  paginateSize: number;
  next: number;
  filteredEntriesBySearch: ForumResponse;
  buttonText: string;
};

export const Paginations = ({
  begin,
  postsPerPage,
  paginate,
  paginateSize,
  next,
  filteredEntriesBySearch,
  buttonText,
}: PaginationsType) => {
  const lastPage = filteredEntriesBySearch?.length;
  const pageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const buttonTarget = event.target as HTMLButtonElement;
    const buttonTextClicked =
      buttonTarget.textContent || buttonTarget.innerText;
    let myButtonText: number;
    const buttonsDom = buttonTarget.parentElement?.children;

    if (+buttonTextClicked >= 0 && buttonsDom) {
      begin = +buttonTextClicked * postsPerPage;

      buttonsDom[Number(buttonText)].classList.replace(
        'bg-green-600',
        'bg-light-grey'
      );
      // buttonsDom[Number(buttonText)].classList.add('bg-light-grey');

      buttonTarget.classList.replace('bg-light-grey', 'bg-green-600');
      myButtonText = +buttonTextClicked - next;
    }
    // if 'next' button clicked
    if (buttonTextClicked === 'next') {
      myButtonText = 0;
      if (next < lastPage / postsPerPage - paginateSize) {
        next += paginateSize;
        begin = postsPerPage * next;
      }
    }
    // if 'prev' button clicked
    if (buttonTextClicked === 'prev') {
      myButtonText = 0;
      if (next > paginateSize - 1) {
        next -= paginateSize;
        begin = postsPerPage * next;
      }
    }
    paginate((old: ForumParams) => ({
      ...old,
      begin: begin,
      next: next,
      buttonText: myButtonText.toString(),
    }));
  };

  // [UI] generate pagination button list
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
    <div className='pb-10 w-9/12'>
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
