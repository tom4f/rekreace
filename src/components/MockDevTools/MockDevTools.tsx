import { useState } from 'react';
import { APP_MOCKS, ENV_MODE } from '../../env';
import {
  DEFAULT_STATE,
  LOCAL_STORAGE_MOCK_DELAY_KEY,
  LOCAL_STORAGE_MOCK_KEY,
} from '../../features/mocks';
import { availableScenarios } from '../../features/mocks';
import {
  Button,
  ClickableButton,
  CustomCol,
  DevToolsWrapper,
  Headline,
  Input,
  Label,
  Table,
  TableWrapper,
  Tag,
  Td,
  Th,
  Tr,
} from './MockDevTools.styled';

const MOCK_DEV_TOOLS_LOCAL_STORAGE_KEY = 'devTools_mocks';

export const MockDevTools = () => {
  if (ENV_MODE === 'production' || APP_MOCKS === 'false') return null;

  let isVisibleCurrentState = false;

  try {
    isVisibleCurrentState = JSON.parse(
      localStorage.getItem(MOCK_DEV_TOOLS_LOCAL_STORAGE_KEY) || 'false'
    );
  } catch (e) {
    // do nothing
  }

  const [reload, setReload] = useState(1);
  const [isVisible, setIsVisible] = useState(isVisibleCurrentState);
  const [search, setSearch] = useState('');
  const [delay, setDelay] = useState(
    parseInt(localStorage.getItem(LOCAL_STORAGE_MOCK_DELAY_KEY) || '0')
  );

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

  const onTagClick = (route: string, scenario: string) => {
    let settings: Settings = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_MOCK_KEY) || '{}'
    );
    if (!settings) {
      settings = {};
    }

    settings[route] = scenario;

    localStorage.setItem(LOCAL_STORAGE_MOCK_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('localStorageChange'));
    setReload(Math.random());
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
      <Button onClick={onVisibleButtonClick} $isVisible={isVisible}>
        {isVisible ? 'X' : 'MOCK'}
      </Button>
      {isVisible && (
        <DevToolsWrapper>
          <div>
            <CustomCol>
              <Headline>
                <Input
                  placeholder='Search...'
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <Label>Response delay (ms):</Label>
                <Input
                  placeholder='Response delay (ms)...'
                  onChange={(e) => onDelayChange(parseInt(e.target.value) || 0)}
                  value={delay}
                />
                <ClickableButton onClick={onResetClick}>
                  reset all mocks to default state
                </ClickableButton>
              </Headline>
              <TableWrapper>
                <Table key={reload}>
                  <thead>
                    <tr>
                      <Th style={{ width: 400 }}>Endpoint</Th>
                      <Th>Available scenarios</Th>
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
                          <Tr key={route}>
                            <Td>{route}</Td>
                            <Td>
                              <Tag
                                selected={
                                  getActiveItem(route) === DEFAULT_STATE
                                }
                                onClick={() => onTagClick(route, DEFAULT_STATE)}
                              >
                                default
                              </Tag>
                              {Object.keys(scenarios).map((scenario) => {
                                return (
                                  <Tag
                                    key={scenario}
                                    selected={getActiveItem(route) === scenario}
                                    onClick={() => onTagClick(route, scenario)}
                                  >
                                    {scenario}
                                  </Tag>
                                );
                              })}
                            </Td>
                          </Tr>
                        ) : (
                          <></>
                        );
                      })}
                  </tbody>
                </Table>
              </TableWrapper>
            </CustomCol>
          </div>
        </DevToolsWrapper>
      )}
    </>
  );
};
