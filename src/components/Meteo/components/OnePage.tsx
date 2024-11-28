import { OneGraph } from "./../components/OneGraph";
import { Fragment } from "react";
import { onePageType } from "./TypeDefinition";

export const OnePage = ({ graphsData, loadPocasiAsyncCustom }: onePageType) => {
  return (
    <>
      {graphsData[0]?.data?.length > 1 &&
        graphsData.map((graphData, index) => {
          return (
            <Fragment key={index}>
              {graphData.specific?.map((oneSpecific, index1) => (
                <OneGraph
                  key={index1}
                  graphData={{
                    ...graphData,
                    specific: oneSpecific,
                    common: {
                      ...graphData.common,
                      loadDataFunction: loadPocasiAsyncCustom,
                      index,
                    },
                  }}
                />
              ))}
            </Fragment>
          );
        })}
    </>
  );
};
