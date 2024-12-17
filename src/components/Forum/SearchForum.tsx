import { Input } from '../Atoms/Input/Input';

type SearchForumType = {
  selectedCategory: number;
  filteredEntriesCalculate: (
    searchText: string,
    selectedCategory: number
  ) => void;
};

export const SearchForum = ({
  filteredEntriesCalculate,
  selectedCategory,
}: SearchForumType) => {
  return (
    <Input
      style={{ width: '130px' }}
      label='Hledej'
      placeholder='hledaný text'
      onChange={(event) =>
        filteredEntriesCalculate(event.target.value, selectedCategory)
      }
    />
  );
};
