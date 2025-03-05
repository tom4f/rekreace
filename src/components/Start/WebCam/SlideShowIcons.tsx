import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  faPlayCircle,
  faStopCircle,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const daysSlideShowStyles = css`
  bottom: 22px;
  left: 30px;
`;

const minutesSlideShowStyles = css`
  bottom: -15px;
  left: 30px;
`;

const resetSlideShowStyles = css`
  bottom: 50px;
  right: 0px;
`;

const slideShowStyles = {
  daysSlideShow: daysSlideShowStyles,
  minutesSlideShow: minutesSlideShowStyles,
  reset: resetSlideShowStyles,
};

const StyledIconWrapper = styled.div<{
  webCamState: keyof typeof slideShowStyles;
}>`
  position: absolute;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.5);
  z-index: 1;

  ${({ webCamState }) => slideShowStyles[webCamState]}

  &:hover {
    color: white;
  }
`;

export const StartShow = ({
  onClick,
  webCamState,
}: {
  onClick: () => void;
  webCamState: keyof typeof slideShowStyles;
}) => (
  <StyledIconWrapper webCamState={webCamState} onClick={onClick}>
    <FontAwesomeIcon size='2x' icon={faPlayCircle} />
  </StyledIconWrapper>
);

export const StopShow = ({
  onClick,
  webCamState,
}: {
  onClick: () => void;
  webCamState: keyof typeof slideShowStyles;
}) => (
  <StyledIconWrapper webCamState={webCamState} onClick={onClick}>
    <FontAwesomeIcon size='2x' icon={faStopCircle} />
  </StyledIconWrapper>
);

export const ResetShow = ({ onClick }: { onClick: () => void }) => (
  <StyledIconWrapper webCamState={'reset'} onClick={onClick}>
    <FontAwesomeIcon size='3x' icon={faVideo} />
  </StyledIconWrapper>
);
