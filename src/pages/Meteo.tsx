import { Navigate, Route, Routes } from 'react-router-dom';
import { DateProvider } from '../components/Meteo/components/DateContext';
import { DavisGraphs } from '../components/Meteo/components/DavisGraphs';
import { DavisGraphsDay } from '../components/Meteo/components/DavisGraphsDay';
import { LipnoGraphs } from '../components/Meteo/components/LipnoGraphs';
import { ModifyPocasi } from '../components/Meteo/components/ModifyPocasi';
import {
  NavBar,
  NavBarDavis,
  NavBarLipno,
  NavBarOldStation,
} from '../components/Meteo/components/NavBar';
import { OldGraphs } from '../components/Meteo/components/OldGraphs';
import { ShowDayGraph } from '../components/Meteo/components/ShowDayGraph';
import { ShowDayStatistic } from '../components/Meteo/components/ShowDayStatistic';
import { ShowDayTable } from '../components/Meteo/components/ShowDayTable';
import { ShowOldStationTable } from '../components/Meteo/components/ShowOldStationTable';
import { ShowYearGraph } from '../components/Meteo/components/ShowYearGraph';
import { YearTable } from '../components/Meteo/components/YearTable';

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
            <Route path='year' element={<DavisGraphs />} />
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
            <Route path='graphs' element={<LipnoGraphs />} />
            <Route
              path='table'
              element={
                <>
                  <YearTable />
                  <ShowYearGraph />
                </>
              }
            />
            <Route path='edit' element={<ModifyPocasi />} />
          </Route>

          <Route path='oldStation' element={<NavBarOldStation />}>
            <Route path='' element={<Navigate replace to='graphs' />} />
            <Route path='graphs' element={<OldGraphs />} />
            <Route path='table' element={<ShowOldStationTable />} />
          </Route>
        </Routes>
      </DateProvider>
    </div>
  );
};
