import styled from 'styled-components';

const textSvg = (sliderText: string) =>
  `<svg viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
        <style>
            .heavy {
                font: bold 17px sans-serif;
                dominant-baseline:central;
                text-anchor:middle;
            }
        </style>
        <text x="50%" y="50%" class="heavy" fill="black">
            ${sliderText}
        </text>
    </svg>`;

const base64replace = {
  '<': '%3C',
  '>': '%3E',
  '{': '%7B',
  '}': '%7D',
  '#': '%23',
  '\r\n': ' ',
  '\n': ' ',
  '\r': ' ',
};

const base64Svg = (sliderText: string) =>
  textSvg(sliderText).replace(
    /[<>{}(\r\n|\n|\r)]/g,
    (oneString) => base64replace[oneString as keyof typeof base64replace]
  );

export const SliderWithText = styled.input<{ $time: string }>`
  &::-webkit-slider-thumb {
    background-image: url('data:image/svg+xml, ${(props) =>
      base64Svg(props.$time)}');
  }
  &::-moz-range-thumb {
    background-image: url('data:image/svg+xml, ${(props) =>
      base64Svg(props.$time)}');
  }
`;
