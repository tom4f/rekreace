import { ForumResponse } from "../../features/forum/hooks";
import { ForumParams } from "./Forum";

type PostsPerPageType = {
  paginate: React.Dispatch<React.SetStateAction<ForumParams>>;
  filteredEntriesBySearch: ForumResponse;
};

export const PostsPerPage = ({
  filteredEntriesBySearch,
  paginate,
}: PostsPerPageType) => {
  const filteredPostsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const postsPerPage = Number(event.target.value);
    const begin = 0;
    const end = begin + postsPerPage - 1;
    paginate((old) => ({
      ...old,
      begin: 0,
      next: 0,
      postsPerPage: postsPerPage,
      entries: filteredEntriesBySearch.slice(begin, end),
    }));
  };

  return (
    <select
      required
      name="postsPerPage"
      onChange={(e) => filteredPostsPerPage(e)}
    >
      <option value="10">příspěvků na stránku</option>
      <option value="5"> 5</option>
      <option value="10"> 10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>
  );
};
