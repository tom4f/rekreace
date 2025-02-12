import { Url } from 'api/paths';
import { getDateParts } from 'utils';

import { DavisGraphTypes } from './DavisTypes';

const createSvgFallback = (fallbackText: string) => {
  const svg = `
    <svg width="724" height="170" xmlns="http://www.w3.org/2000/svg">

       <rect width="100%" height="100%" fill="black" stroke="grey" stroke-width="4"/>
      <text x="50%" y="50%" font-size="16" fill="red" text-anchor="middle" dominant-baseline="middle">
        ${fallbackText}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

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
        (e.currentTarget.src = createSvgFallback(
          `${graphType} graph not found`
        ))
      }
    />
  );
};
