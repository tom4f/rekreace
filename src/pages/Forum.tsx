import { Button, Header, Input, Select } from 'components/Atoms';
import { AddEntry, Messages } from 'components/Forum';
// import { useGetForum } from 'features/forum';
import {
  ForumResponse,
  useGetForumGraphQL,
} from 'features/forum/hooks/useGetForumGraphQL';
import { useEffect, useRef, useState } from 'react';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  of,
  switchMap,
} from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { Url } from 'src/api/paths';
import { basicOptions } from 'src/components/Forum';

export type ForumParams = {
  searchText: string;
  selectedCategory: number;
};

export const Forum = () => {
  const isKalisteType = window.location.search === '?typ=4';

  const [type, setType] = useState(isKalisteType ? [4] : [0, 1, 2, 3, 4]);
  const [searchText, setSearchText] = useState('');
  const [addEntry, setAddEntry] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const [offset, setOffset] = useState(0);
  const limit = 10;

  const {
    data: entries,
    loading,
    previousData,
  } = useGetForumGraphQL({
    searchText,
    typ: type,
    start: offset,
    limit,
  });

  const [forumEntries, setForumEntries] = useState<ForumResponse>([]);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSetType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value;
    setOffset(0);
    setType(type.length ? [+type] : [0, 1, 2, 3, 4]);
  };

  const onAddEntry = () => {
    setOffset(0);
    setSearchText('');
    setType([0, 1, 2, 3, 4]);
    setAddEntry(true);
  };

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const subscription = fromEvent(input, 'input')
      .pipe(
        map((e) => (e.target as HTMLInputElement).value),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((text) => {
          // RxJS ajax() operator handles cancellation automatically
          // ajax.getJSON(`${Url.NEW_API}/forum/search_forum.php?q=${text}`)
          setOffset(0);
          setSearchText(text);

          return of(null); // dummy return to keep the stream
        })
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (entries && !loading) {
      setForumEntries((prev) =>
        offset === 0 ? entries : [...prev, ...entries]
      );
      setHasMore(entries.length === limit);
    }
  }, [entries, loading, offset]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver((observerEntries) => {
      if (
        observerEntries.some((entry) => entry.isIntersecting) &&
        hasMore &&
        !loading
      ) {
        setOffset((prev) => prev + limit);
      }
    });

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [loading, hasMore]);

  const optionList = isKalisteType
    ? [{ value: '4', label: 'Kaliště 993m n.m.' }]
    : [{ value: '', label: 'všechny' }, ...basicOptions];

  return (
    <>
      <Header>Lipenské fórum</Header>

      {addEntry && (
        <div className='bg-amber-500'>
          <AddEntry addEntry={addEntry} setAddEntry={setAddEntry} />
        </div>
      )}

      {addEntry && <Header>&nbsp;</Header>}

      <div className='bg-amber-500 pt-1 pb-6'>
        {!addEntry && (
          <div className='flex flex-wrap justify-center pt-4'>
            <Input
              style={{ width: '130px' }}
              label='Hledej'
              placeholder='hledaný text'
              ref={inputRef}
            />
            <Select
              label='Kategorie'
              options={optionList}
              onChange={onSetType}
            />

            <Button label='Přidej komentář' onClick={onAddEntry} />
          </div>
        )}
        <Messages
          entries={
            loading && offset === 0 && previousData
              ? previousData.getForumMessages
              : forumEntries
          }
        />

        <div ref={loadMoreRef} style={{ height: '50px' }} />
      </div>
    </>
  );
};
