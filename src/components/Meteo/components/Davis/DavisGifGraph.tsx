import { Url } from 'api/paths';
import { createSvgFallback, getDateParts } from 'utils';

import { DavisGraphTypes } from './DavisTypes';

export const DavisGifGraph = ({
  davisDaily,
  graphType,
}: {
  davisDaily: Date;
  graphType: DavisGraphTypes;
}) => {
  const { year, month, day } = getDateParts(davisDaily);

  return (
    <img
      src={`${Url.DAVIS}/archive/${year}/${graphType}-${year}-${month}-${day}.gif`}
      onError={(e) =>
        (e.currentTarget.src = createSvgFallback({
          fallbackText: `${graphType} graph not found`,
          width: 724,
          height: 170,
        }))
      }
    />
  );
};
