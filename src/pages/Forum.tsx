import '../components/Forum/css/forum.css';

import { useState } from 'react';
import { Button, Header, Input, Select } from 'components/Atoms';

import { AddEntry } from '../components/Forum/AddEntry';
import { Messages } from '../components/Forum/Messages';
import { Paginations } from '../components/Forum/Paginations';
import { useGetForum } from '../features/forum';

export type ForumParams = {
  begin: number;
  next: number;
  searchText: string;
  selectedCategory: number;
};

export const Forum = () => {
  const [forum, setForum] = useState<ForumParams>({
    begin: 0,
    next: 0,
    searchText: '',
    // filter based on url
    selectedCategory: window.location.search === '?category=8' ? 8 : 999999,
  });

  const [addEntry, setAddEntry] = useState(false);

  const categoryFromUrl = window.location.search === '?category=8' ? 8 : 999999;

  const searchCriteria =
    categoryFromUrl === 8 ? 'WHERE typ = 8' : 'WHERE (typ < 4) OR (typ = 8)';

  const { data: allEntries, isSuccess } = useGetForum({
    searchCriteria,
    start: 0,
    limit: 999999,
  });

  if (!Array.isArray(allEntries)) {
    return null;
  }

  const postsPerPage = 5;
  const paginateSize = 10;

  let filteredEntries = allEntries;

  const { begin, next, searchText, selectedCategory } = forum;

  const filteredEntriesByCategory =
    selectedCategory === 999999
      ? allEntries
      : allEntries.filter((one) => +one.typ === selectedCategory);

  const filteredForum = filteredEntriesByCategory.filter((entry) => {
    const regex = new RegExp(`${searchText}`, 'gi');
    return entry.text.match(regex) || entry.jmeno.match(regex);
  });

  if (!searchText.length) {
    filteredEntries = filteredEntriesByCategory;
  } else if (filteredForum.length === 0) {
    filteredEntries = [];
  } else {
    filteredEntries = filteredForum;
  }

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
    <>
      <Header>Lipenské fórum</Header>
      <div className='center'>
        <div>
          {addEntry && (
            <AddEntry
              addEntry={addEntry}
              setAddEntry={setAddEntry}
              categoryFromUrl={categoryFromUrl}
            />
          )}
        </div>
      </div>

      {addEntry && <Header>&nbsp;</Header>}

      <div className='center'>
        {!addEntry && (
          <div className='flex flex-wrap justify-center pt-4'>
            <Input
              style={{ width: '130px' }}
              label='Hledej'
              placeholder='hledaný text'
              onChange={(event) =>
                setForum((orig) => ({
                  ...orig,
                  searchText: event.target.value,
                  begin: 0,
                  next: 0,
                }))
              }
            />
            <Select
              label='Kategorie'
              options={[
                ...optionList,
                { value: '8', label: 'Kaliště 993m n.m.' },
              ]}
              onChange={(event) =>
                setForum((orig) => ({
                  ...orig,
                  selectedCategory: +event.target.value,
                  begin: 0,
                  next: 0,
                }))
              }
            />

            <Button label='Přidej komentář' onClick={() => setAddEntry(true)} />
          </div>
        )}
        <div className='pt-5'>{filteredEntries?.length} komentářů.</div>
        {isSuccess && filteredEntries ? (
          <>
            <Messages
              entries={filteredEntries.slice(begin, begin + postsPerPage)}
            />

            <br />
            {filteredEntries.length > postsPerPage && (
              <Paginations
                setForum={setForum}
                postsPerPage={postsPerPage}
                filteredEntries={filteredEntries}
                begin={begin}
                paginateSize={paginateSize}
                next={next}
              />
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
