import { Navigate, Route, Routes } from "react-router-dom";
import { DateProvider } from "./components/DateContext";
import { DavisGraphs } from "./components/DavisGraphs";
import { DavisGraphsDay } from "./components/DavisGraphsDay";
import { LipnoGraphs } from "./components/LipnoGraphs";
import { ModifyPocasi } from "./components/ModifyPocasi";
import {
  NavBar,
  NavBarDavis,
  NavBarLipno,
  NavBarOldStation,
} from "./components/NavBar";
import { OldGraphs } from "./components/OldGraphs";
import { ShowDayGraph } from "./components/ShowDayGraph";
import { ShowDayStatistic } from "./components/ShowDayStatistic";
import { ShowDayTable } from "./components/ShowDayTable";
import { ShowOldStationTable } from "./components/ShowOldStationTable";
import { ShowYearGraph } from "./components/ShowYearGraph";
import { YearTable } from "./components/YearTable";
import AppStyles from "./css/App.module.css";

export const Meteo = () => {
  return (
    <div className={AppStyles.graphs}>
      <NavBar />
      <DateProvider>
        <Routes>
          <Route path="/" element={<Navigate replace to={"frymburk/week"} />} />
          <Route path="frymburk" element={<NavBarDavis />}>
            <Route path="" element={<Navigate replace to="week" />} />
            <Route path="week" element={<DavisGraphsDay />} />
            <Route path="year" element={<DavisGraphs />} />
            <Route
              path="table"
              element={
                <>
                  <ShowDayTable />
                  <ShowDayGraph />
                </>
              }
            />
            <Route path="statistics" element={<ShowDayStatistic />} />
          </Route>

          <Route path="lipno" element={<NavBarLipno />}>
            <Route path="" element={<Navigate replace to="graphs" />} />
            <Route path="graphs" element={<LipnoGraphs />} />
            <Route
              path="table"
              element={
                <>
                  <YearTable />
                  <ShowYearGraph />
                </>
              }
            />
            <Route path="edit" element={<ModifyPocasi />} />
          </Route>

          <Route path="oldStation" element={<NavBarOldStation />}>
            <Route path="" element={<Navigate replace to="graphs" />} />
            <Route path="graphs" element={<OldGraphs />} />
            <Route path="table" element={<ShowOldStationTable />} />
          </Route>
        </Routes>
      </DateProvider>
    </div>
  );
};
