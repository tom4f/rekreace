type SvgParamsType = {
  fallbackText: string;
  width: number;
  height: number;
};

export const createSvgFallback = (svgFallbackParams: SvgParamsType) => {
  const { width, height, fallbackText } = svgFallbackParams;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">

       <rect width="100%" height="100%" fill="black" stroke="grey" stroke-width="4"/>
      <text x="50%" y="50%" font-size="16" fill="red" text-anchor="middle" dominant-baseline="middle">
        ${fallbackText}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
