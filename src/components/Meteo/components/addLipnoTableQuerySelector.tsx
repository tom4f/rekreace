import { LipnoResponse } from 'src/features/meteo';
import { EditMeteoType } from './ModifyPocasi';
import { SetEditMeteoType } from './TypeDefinition';

export type AddQuerySelectorType = (
  pocasi: LipnoResponse,
  editMeteo: EditMeteoType,
  setEditMeteo: SetEditMeteoType
) => void;

export const addLipnoTableQuerySelector: AddQuerySelectorType = (
  pocasi,
  editMeteo,
  setEditMeteo
) => {
  const editTermin = (event: MouseEvent) => {
    const clickedTd = event.target as Element;
    const childsTd = clickedTd.parentNode?.children;
    if (!childsTd) return null;

    let prevTd = clickedTd;
    let clicedColumnNr = 0;

    for (let i = childsTd.length - 1; i > 0; i--) {
      if (prevTd.previousElementSibling) {
        prevTd = prevTd.previousElementSibling;
        clicedColumnNr++;
      }
    }

    const allKeys = ['hladina', 'pritok', 'odtok', 'voda', 'vzduch', 'pocasi'];

    let clickedDate = '';
    if (childsTd[0] instanceof HTMLElement) {
      clickedDate = childsTd[0].innerText;
    }

    const clickedRowNr = pocasi.reduce(
      (total, value, index) =>
        value.datum === clickedDate ? total + index : total,
      0
    );

    const editKey = allKeys[clicedColumnNr - 1] as
      | 'hladina'
      | 'pritok'
      | 'odtok'
      | 'voda'
      | 'vzduch'
      | 'pocasi';

    const { datum: editDate, [editKey]: editValue } = pocasi[clickedRowNr];

    if (clicedColumnNr) {
      setEditMeteo({
        ...editMeteo,
        editDate,
        editKey,
        editValue: editValue,
        dispEdit: true,
        dispDelete: false,
      });
    } else {
      setEditMeteo({
        ...editMeteo,
        editDate,
        editKey,
        editValue,
        dispEdit: false,
        dispDelete: true,
      });
    }
  };

  const clickedDiv = document.querySelectorAll('td');

  clickedDiv.forEach((div) => {
    div.addEventListener('click', (e) => editTermin(e));
  });
};
