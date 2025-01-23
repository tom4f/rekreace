import { Navigate, Route, Routes } from 'react-router-dom';
import { DateProvider } from '../components/Meteo/components/DateContext';
import { DavisGraphsDay } from '../components/Meteo/components/DavisGraphsDay';
import { ModifyLipno } from '../components/Meteo/components/ModifyLipno';
import {
  NavBar,
  NavBarDavis,
  NavBarLipno,
  NavBarOldStation,
} from '../components/Meteo/components/NavBar';
import { UniversalGraphs } from 'src/components/Meteo/components/UniversalGraphs';
import { ShowDayGraph } from '../components/Meteo/components/ShowDayGraph';
import { ShowDayStatistic } from '../components/Meteo/components/ShowDayStatistic';
import { ShowDayTable } from '../components/Meteo/components/ShowDayTable';
import { ShowOldStationTable } from '../components/Meteo/components/ShowOldStationTable';
import { ShowYearGraph } from '../components/Meteo/components/ShowYearGraph';
import { ShowYearTable } from 'src/components/Meteo/components/ShowYearTable';

import davisGraphsConfig from 'src/components/Meteo/config/davis-graphs.json';
import lipnoGraphsConfig from 'src/components/Meteo/config/lipno-graphs.json';
import oldGraphsGraphsConfig from 'src/components/Meteo/config/old-graphs.json';

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
