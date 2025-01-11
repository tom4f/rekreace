import { useState } from 'react';

import {
  DEFAULT_STATE,
  LOCAL_STORAGE_MOCK_DELAY_KEY,
  LOCAL_STORAGE_MOCK_KEY,
} from '../../features/mocks';
import { availableScenarios } from '../../features/mocks';
import { Button } from '../Atoms/Button/Button';
import { Input } from '../Atoms/Input/Input';
import { useQueryClient } from '@tanstack/react-query';

const MOCK_DEV_TOOLS_LOCAL_STORAGE_KEY = 'devTools_mocks';

export const MockDevTools = () => {
  const queryClient = useQueryClient();
  const [reload, setReload] = useState(1);

  const [search, setSearch] = useState('');
  const [delay, setDelay] = useState(
    parseInt(localStorage.getItem(LOCAL_STORAGE_MOCK_DELAY_KEY) || '0')
  );

  let isVisibleCurrentState = false;

  try {
    isVisibleCurrentState = JSON.parse(
      localStorage.getItem(MOCK_DEV_TOOLS_LOCAL_STORAGE_KEY) || 'false'
    );
  } catch (e) {
    console.log(e);
  }

  const [isVisible, setIsVisible] = useState(isVisibleCurrentState);

  const onVisibleButtonClick = () => {
    setIsVisible((current) => {
      localStorage.setItem(
        MOCK_DEV_TOOLS_LOCAL_STORAGE_KEY,
        JSON.stringify(!current)
      );

      return !current;
    });
  };

  interface Settings {
    [key: string]: string;
  }

  const onTagClick = (route: string[], scenario: string) => {
    let settings: Settings = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_MOCK_KEY) || '{}'
    );
    if (!settings) {
      settings = {};
    }

    settings[route[0]] = scenario;

    localStorage.setItem(LOCAL_STORAGE_MOCK_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('localStorageChange'));
    setReload(Math.random());
  };

  const onReFetchClick = (key: string) => {
    queryClient.invalidateQueries({
      queryKey: [key],
    });
  };

  const onDelayChange = (delay: number) => {
    localStorage.setItem(LOCAL_STORAGE_MOCK_DELAY_KEY, JSON.stringify(delay));
    window.dispatchEvent(new Event('localStorageChange'));
    setReload(Math.random());
    setDelay(delay);
  };

  const getActiveItem = (key: string) => {
    const settings = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_MOCK_KEY) || '{}'
    );
    if (!settings) {
      return DEFAULT_STATE;
    }

    if (settings[key]) {
      return settings[key];
    }

    return DEFAULT_STATE;
  };

  const onResetClick = () => {
    localStorage.setItem(LOCAL_STORAGE_MOCK_KEY, JSON.stringify({}));
    window.dispatchEvent(new Event('localStorageChange'));
    setReload(Math.random());
  };

  return (
    <>
      <Button
        onClick={onVisibleButtonClick}
        label={isVisible ? 'X' : 'MOCK'}
        className='right-4 bottom-16 fixed z-50'
      />
      {isVisible && (
        <div className='right-0 left-0 bottom-0 fixed z-40 bg-slate-500'>
          <div className='flex'>
            <Input
              label='search route'
              placeholder='Search...'
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <Input
              label='Response delay (ms):'
              placeholder='Response delay (ms)...'
              onChange={(e) => onDelayChange(parseInt(e.target.value) || 0)}
              value={delay}
            />
            <Button
              onClick={onResetClick}
              label='reset all mocks to default state'
            />
          </div>

          <table key={reload} className='w-11/12 overflow-auto max-h-md'>
            <thead>
              <tr>
                <th className='text-left'>Endpoint</th>
                <th className='text-left'>Available scenarios</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(availableScenarios.entries())
                .filter((item) => {
                  if (!search) {
                    return true;
                  }
                  return (
                    item[0].includes(search) ||
                    Object.keys(item[1]).join(' ').includes(search)
                  );
                })
                .map(([route, scenarios]) => {
                  return Object.keys(scenarios).length ? (
                    <tr key={route[0]}>
                      <td>{route[0]}</td>
                      <td>
                        <Button
                          label='reset'
                          variant='blue'
                          onClick={() => onReFetchClick(route[1])}
                        />
                        <Button
                          label='default'
                          variant={
                            getActiveItem(route[0]) === DEFAULT_STATE
                              ? 'primary'
                              : 'secondary'
                          }
                          onClick={() => onTagClick(route, DEFAULT_STATE)}
                        />
                        {Object.keys(scenarios).map((scenario) => {
                          return (
                            <Button
                              key={scenario}
                              label={scenario}
                              variant={
                                getActiveItem(route[0]) === scenario
                                  ? 'primary'
                                  : 'secondary'
                              }
                              onClick={() => onTagClick(route, scenario)}
                            />
                          );
                        })}
                      </td>
                    </tr>
                  ) : (
                    <></>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
