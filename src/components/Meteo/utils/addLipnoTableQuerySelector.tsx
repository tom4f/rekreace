import { lipnoKeys, LipnoKeyType, LipnoResponse } from 'features/meteo';

import { EditMeteoType, SetEditMeteoType } from '../components';

export type AddQuerySelectorType = (
  pocasi: LipnoResponse,
  setEditMeteo: SetEditMeteoType
) => void;

export const addLipnoTableQuerySelector: AddQuerySelectorType = (
  pocasi,
  setEditMeteo
) => {
  const editTermin = (event: MouseEvent) => {
    const clickedTd = event.target as Element;
    const childsTd = clickedTd.parentNode?.children;
    if (!childsTd) return null;

    let prevTd = clickedTd;
    let clicedEditColumnNr = 0;

    for (let i = childsTd.length - 1; i > 0; i--) {
      if (prevTd.previousElementSibling) {
        prevTd = prevTd.previousElementSibling;
        clicedEditColumnNr++;
      }
    }

    let clickedDeleteDateText = '';
    if (childsTd[0] instanceof HTMLElement) {
      clickedDeleteDateText = childsTd[0].innerText;
    }

    const clickedRowNr = pocasi.reduce(
      (total, value, index) =>
        value.datum === clickedDeleteDateText ? total + index : total,
      0
    );

    const editKey = lipnoKeys[clicedEditColumnNr - 1] as LipnoKeyType;

    const { datum: editDate, [editKey]: editValue } = pocasi[clickedRowNr];

    setEditMeteo((orig: EditMeteoType) => ({
      ...orig,
      editDate,
      editKey,
      editValue,
      dispEdit: !!clicedEditColumnNr,
      dispDelete: !clicedEditColumnNr,
      method: clicedEditColumnNr ? 'edit' : 'delete',
    }));
  };

  const clickedDiv = document.querySelectorAll('td');

  clickedDiv.forEach((div) => {
    div.addEventListener('click', editTermin);
  });
};
