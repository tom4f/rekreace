
import { ForumParams } from "./Forum";
import { ForumResponse } from "../../features/forum/hooks";

type PaginationsType = {
    begin: number
    postsPerPage: number
    paginate: React.Dispatch<React.SetStateAction<ForumParams>>
    paginateSize: number
    next: number
    filteredEntriesBySearch: ForumResponse
    buttonText: string
}

export const Paginations = ( {begin, postsPerPage, paginate, paginateSize, next, filteredEntriesBySearch, buttonText}: PaginationsType ) => {
    const lastPage = filteredEntriesBySearch?.length;
    const pageButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const buttonTarget = event.target as HTMLButtonElement 
        const buttonTextClicked = buttonTarget.textContent || buttonTarget.innerText;
        let myButtonText: number;
        const buttonsDom = buttonTarget.parentElement?.children;

        if ( +buttonTextClicked >= 0 && buttonsDom){
            begin =  +buttonTextClicked * postsPerPage;

            buttonsDom[Number(buttonText)].classList.remove('button_on');

            buttonTarget.classList.add('button_on');
            myButtonText = +buttonTextClicked - next;
        }
        // if 'next' button clicked
        if (buttonTextClicked === 'next'){
            myButtonText = 0;
            if (next < (lastPage / postsPerPage) - paginateSize ){
                next += paginateSize;
                begin = postsPerPage * next;
            }
        }
        // if 'prev' button clicked
        if (buttonTextClicked === 'prev'){
            myButtonText = 0;
            if (next > paginateSize - 1){
                next -= paginateSize;
                begin = postsPerPage * next;
            }
        }
        paginate((old: ForumParams) => ({
            ...old,
            begin : begin,
            next: next,
            buttonText: myButtonText.toString()
        }));
    }

    // [UI] generate pagination button list 
    const showPagination = () => {
        const buttonPageList = [];
        for( let i = next; i < lastPage / postsPerPage; i++ ){
            if( i < next + paginateSize ){
                const buttonClass = `pagina ${i === next ? 'button_on' : null}`;
                buttonPageList.push(
                    <button 
                        // set background-color for 1st button
                        className = { buttonClass }
                        //className = {i === next ? 'button_on' : null}
                        key = {i}
                        onClick = {e => pageButtonClick(e)}>
                        {i}
                    </button>
                );
            }
        }
        return buttonPageList;
    }

    return ( 
        <div className="kniha_pagination">
            <button className="paginaPrev" onClick={ e => pageButtonClick(e) }>prev</button>
            <span>
                { showPagination() }
            </span>
            <button className="paginaNext" onClick={ e => pageButtonClick(e) }>next</button>
        </div>
    );
}