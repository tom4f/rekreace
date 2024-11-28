import { useEffect, useState } from "react";
import {
  ForumResponse,
  useGetForum,
} from "../../features/forum/hooks/useGetForum";
import { AddEntry } from "./AddEntry";
import "./css/forum.css";
import { Messages } from "./Messages";
import { Paginations } from "./Paginations";
import { PostsPerPage } from "./PostsPerPage";
import { SearchForum } from "./SearchForum";
import { SelectForum } from "./SelectForum";
import { SelectPaginate } from "./SelectPaginate";
import { OneMessage } from "../../features/forum/hooks/useGetForum";

export type ForumParams = {
  allEntries: ForumResponse;
  filteredEntriesByCategory: ForumResponse;
  filteredEntriesBySearch: ForumResponse;
  entries: OneMessage[];
  begin: number;
  postsPerPage: number;
  paginateSize: number;
  next: number;
  searchText: string;
  selectedCategory: number;
  buttonText: string;
  categoryFromUrl: number;
};

export const Forum = () => {
  const [state, setState] = useState<ForumParams>({
    allEntries: [],
    filteredEntriesByCategory: [],
    filteredEntriesBySearch: [],
    entries: [],
    begin: 0,
    postsPerPage: 5,
    paginateSize: 10,
    next: 0,
    searchText: "",
    // filter based on url
    selectedCategory: window.location.search === "?category=8" ? 8 : 999999,
    buttonText: "0",
    categoryFromUrl: window.location.search === "?category=8" ? 8 : 999999,
  });

  const searchCriteria =
    state.categoryFromUrl === 8
      ? "WHERE typ = 8"
      : "WHERE (typ < 4) OR (typ = 8)";

  const { data: allForum, isSuccess } = useGetForum({
    searchCriteria,
    start: 0,
    limit: 999999,
  });

  const end = state.begin + state.postsPerPage - 1;

  useEffect(() => {
    if (isSuccess && allForum.length) {
      setState((orig) => ({
        ...orig,
        allEntries: allForum,
        filteredEntriesByCategory: allForum,
        filteredEntriesBySearch: allForum,
        entries: allForum.slice(state.begin, end),
      }));
    }
  }, [isSuccess, allForum, end, state.begin]);

  const {
    allEntries,
    filteredEntriesBySearch,
    begin,
    postsPerPage,
    paginateSize,
    next,
    searchText,
    selectedCategory,
    buttonText,
    categoryFromUrl,
  } = state;

  // calculate filter result
  const filteredEntriesCalculate = (
    searchText: string,
    selectedCategory: number
  ) => {
    // select category
    const filteredEntriesByCategory =
      selectedCategory === 999999
        ? allEntries
        : allEntries.filter((one) => +one.typ === selectedCategory);
    setState((orig) => ({
      ...orig,
      selectedCategory,
      filteredEntriesByCategory,
      searchText,
      begin: 0,
      next: 0,
    }));
    // search text
    const filteredForum = filteredEntriesByCategory.filter((alarm) => {
      const regex = new RegExp(`${searchText}`, "gi");
      return alarm.text.match(regex) || alarm.jmeno.match(regex);
    });
    if (searchText.length === 0)
      setState((orig) => ({
        ...orig,
        filteredEntriesBySearch: filteredEntriesByCategory,
      }));
    else if (filteredForum.length === 0)
      setState((orig) => ({
        ...orig,
        filteredEntriesBySearch: [],
      }));
    else
      setState((orig) => ({
        ...orig,
        filteredEntriesBySearch: filteredForum,
      }));
  };

  return (
    <div className="top_container">
      <div className="center">
        <div className="header">
          <b>Lipenské fórum</b>
        </div>
        <br />
        <div className="btn-group">
          <AddEntry categoryFromUrl={categoryFromUrl} />
        </div>
        <p style={{ clear: "both" }}></p>
        <br />
        <div className="fields">
          <SearchForum
            filteredEntriesCalculate={filteredEntriesCalculate}
            selectedCategory={selectedCategory}
          />
          <SelectForum
            filteredEntriesCalculate={filteredEntriesCalculate}
            categoryFromUrl={categoryFromUrl}
            searchText={searchText}
          />
        </div>
        <div>Je vybráno {filteredEntriesBySearch?.length} záznamů.</div>
        <Messages
          entries={filteredEntriesBySearch?.slice(begin, begin + postsPerPage)}
        />
        <br />
        <Paginations
          paginate={setState}
          postsPerPage={postsPerPage}
          filteredEntriesBySearch={filteredEntriesBySearch}
          begin={begin}
          paginateSize={paginateSize}
          next={next}
          buttonText={buttonText}
        />
        <br />
        <div className="fields">
          <SelectPaginate paginate={setState} />
          <PostsPerPage
            filteredEntriesBySearch={filteredEntriesBySearch}
            paginate={setState}
          />
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};
