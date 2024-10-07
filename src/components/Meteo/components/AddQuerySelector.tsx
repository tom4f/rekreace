import { addQuerySelectorType } from "./TypeDefinition";

export const addQuerySelector: addQuerySelectorType = ( pocasi, editMeteo, setEditMeteo, webToken ) => {
    // set 'click' event listener for all table <div>

    const editTermin = (event: MouseEvent) => {
        const clickedTd = event.target as Element;
        const childsTd = clickedTd.parentNode?.children;
        if ( !childsTd)  return null
        // previous <td>
        let prevTd = clickedTd;
        let clicedColumnNr = 0;
        // instead 'while'
        for ( let i = childsTd.length - 1; i > 0; i--) {
            if ( prevTd.previousElementSibling ) {
                prevTd = prevTd.previousElementSibling;
                clicedColumnNr++;
            }
        } 
        // order of table columns
        const allKeys = [ 'hladina', 'pritok', 'odtok', 'voda', 'vzduch', 'pocasi' ];
        // if column number is not 0 (date column), continue :
        // get clicked week from first column, e.g. 27.06-04.07.2020
        let clickedDate = ''
        if (childsTd[0] instanceof HTMLElement) {
            clickedDate = childsTd[0].innerText;
        }

        // reduce method is not optimal like search, but works
        const clickedRowNr = pocasi.reduce( (total, value, index) => value.datum === clickedDate ? total + index : total, 0 )
        // get edited property (e.g. 'hladina')
        const editKey = allKeys[clicedColumnNr - 1] as 'hladina' | 'pritok' | 'odtok' | 'voda' | 'vzduch' | 'pocasi'
        // descructuring 'datum' & 'clicked property'
        const { datum: editDate, [editKey]: editValue } = pocasi[clickedRowNr];

        if ( clicedColumnNr ) {
            setEditMeteo(
                {
                    ...editMeteo,
                    editDate,
                    editKey,
                    editValue: editValue,
                    dispEdit : true,
                    dispDelete : false
                }
            );

        } else {
            setEditMeteo(
                {
                    ...editMeteo,
                    editDate,
                    editKey,
                    editValue,
                    dispEdit : false,
                    dispDelete : true,
                }
            );
            console.log(pocasi[clickedRowNr].datum);
        }
        }

    const clickedDiv = document.querySelectorAll('td');
    // add eventListener only if login OK
    if ( webToken !== 'error' ) {
        clickedDiv.forEach( div => {
            div.addEventListener('click', (e) => editTermin(e) )
        })
    }
}