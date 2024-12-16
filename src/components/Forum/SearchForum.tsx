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
      label='Hledej'
      placeholder='hledej'
      onChange={(event) =>
        filteredEntriesCalculate(event.target.value, selectedCategory)
      }
    />
  );
};
