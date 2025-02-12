import styled from 'styled-components';

const base64Svg = (sliderText: string) => {
  const svg = `
    <svg viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
      <style>
        .heavy {
          font: bold 17px sans-serif;
          dominant-baseline: central;
          text-anchor: middle;
        }
      </style>
      <text x="50%" y="50%" class="heavy" fill="black">${sliderText}</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(
    decodeURIComponent(encodeURIComponent(svg))
  )}`;
};

export const SliderWithText = styled.input<{ $time: string }>`
  &::-webkit-slider-thumb {
    background-image: url('${(props) => base64Svg(props.$time)}');
  }
  &::-moz-range-thumb {
    background-image: url('${(props) => base64Svg(props.$time)}');
  }
`;
