import {
  DavisGraph,
  davisGraphsConfig,
  DavisGraphsDay,
  DavisStatistic,
  DavisTable,
  LipnoGraph,
  lipnoGraphsConfig,
  LipnoTable,
  ModifyLipno,
  NavBar,
  NavBarDavis,
  NavBarLipno,
  NavBarOldStation,
  oldGraphsGraphsConfig,
  OldStationTable,
  UniversalGraphs,
} from 'components/Meteo';
import { DateProvider } from 'components/Meteo/context/DateProvider';
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
                  <DavisTable />
                  <DavisGraph />
                </>
              }
            />
            <Route path='statistics' element={<DavisStatistic />} />
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
                  <LipnoTable />
                  <LipnoGraph />
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
            <Route path='table' element={<OldStationTable />} />
          </Route>
        </Routes>
      </DateProvider>
    </div>
  );
};
