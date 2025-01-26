import {
  DateProvider,
  davisGraphsConfig,
  DavisGraphsDay,
  lipnoGraphsConfig,
  ModifyLipno,
  NavBar,
  NavBarDavis,
  NavBarLipno,
  NavBarOldStation,
  oldGraphsGraphsConfig,
  ShowDayGraph,
  ShowDayStatistic,
  ShowDayTable,
  ShowOldStationTable,
  ShowYearGraph,
  ShowYearTable,
  UniversalGraphs,
} from 'components/Meteo';
import { Navigate, Route, Routes } from 'react-router-dom';

export const Meteo = () => {
  return (
    <div>
      <NavBar />
      <DateProvider>
        <Routes>
          <Route path='/' element={<Navigate replace to={'frymburk/week'} />} />
          <Route path='frymburk' element={<NavBarDavis />}>
            <Route path='' element={<Navigate replace to='week' />} />
            <Route path='week' element={<DavisGraphsDay />} />
            <Route
              path='year'
              element={<UniversalGraphs graphsConfig={davisGraphsConfig} />}
            />
            <Route
              path='table'
              element={
                <>
                  <ShowDayTable />
                  <ShowDayGraph />
                </>
              }
            />
            <Route path='statistics' element={<ShowDayStatistic />} />
          </Route>

          <Route path='lipno' element={<NavBarLipno />}>
            <Route path='' element={<Navigate replace to='graphs' />} />
            <Route
              path='graphs'
              element={<UniversalGraphs graphsConfig={lipnoGraphsConfig} />}
            />
            <Route
              path='table'
              element={
                <>
                  <ShowYearTable />
                  <ShowYearGraph />
                </>
              }
            />
            <Route path='edit' element={<ModifyLipno />} />
          </Route>

          <Route path='oldStation' element={<NavBarOldStation />}>
            <Route path='' element={<Navigate replace to='graphs' />} />
            <Route
              path='graphs'
              element={
                <UniversalGraphs
                  graphsConfig={oldGraphsGraphsConfig}
                  startDate='2011-08-22'
                  endDate='2012-08-22'
                />
              }
            />
            <Route path='table' element={<ShowOldStationTable />} />
          </Route>
        </Routes>
      </DateProvider>
    </div>
  );
};
