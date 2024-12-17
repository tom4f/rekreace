import { Select } from '../Atoms/Input/Select';

type SelectForumType = {
  searchText: string;
  filteredEntriesCalculate: (
    searchText: string,
    selectedCategory: number
  ) => void;
  categoryFromUrl: number;
};

export const SelectForum = ({
  searchText,
  filteredEntriesCalculate,
  categoryFromUrl,
}: SelectForumType) => {
  const optionList =
    categoryFromUrl !== 8
      ? [
          { value: '999999', label: 'všechny' },
          { value: '0', label: 'Fórum' },
          { value: '1', label: 'Inzerce' },
          { value: '2', label: 'Seznamka' },
          { value: '3', label: ' K obsahu stránek' },
        ]
      : [];

  return (
    <Select
      label='Kategorie'
      options={[...optionList, { value: '8', label: 'Kaliště 993m n.m.' }]}
      onChange={(event) =>
        filteredEntriesCalculate(searchText, +event.target.value)
      }
    />
  );
};
