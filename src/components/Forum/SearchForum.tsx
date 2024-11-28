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
    <input
      placeholder="hledej"
      type="text"
      size={5}
      onChange={(event) =>
        filteredEntriesCalculate(event.target.value, selectedCategory)
      }
    />
  );
};
