import { css } from '@emotion/react';
import styled from '@emotion/styled';

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

const sliderThumb = ($time: string) => css`
  background-image: url('${base64Svg($time)}');
  width: 50px;
  height: 30px;
  border: 0;
  border-radius: 3px;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  opacity: 0.7;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
`;

export const SliderWithText = styled.input<{ $time: string }>`
  padding: 0px;
  margin: 8px 0 10px 0;

  -webkit-appearance: none;
  appearance: none;

  height: 20px;
  border-radius: 5px;
  background: grey;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    background-color: #ffffff;

    ${(props) => sliderThumb(props.$time)}
  }

  &::-moz-range-thumb {
    ${(props) => sliderThumb(props.$time)}
  }

  &:hover {
    opacity: 1;
  }
`;
