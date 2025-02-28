import { produce } from 'immer';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type WebCamState = 'live' | 'slideShowStarted' | 'slideShowStopped';

export type WebCamType = {
  year?: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  state: WebCamState;
};

const minutesNormailzed = () => {
  const minutesNow = 60 * new Date().getHours() + new Date().getMinutes();
  if (minutesNow > 1377) {
    return 1377;
  } else if (minutesNow < 432) {
    return 432;
  } else {
    return minutesNow - 3 - (minutesNow % 15);
  }
};

const initialWebCamState = {
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
  hour: Math.floor(minutesNormailzed() / 60),
  minute: minutesNormailzed() % 60,
  state: 'live',
};

export const useWebCamStore = create<WebCamStoreType>()(
  devtools((set) => ({
    webCam: initialWebCamState,
    updateWebCam: (updatedValues: Partial<WebCamType>) =>
      set(
        produce((state) => {
          state.webCam = { ...state.webCam, ...updatedValues };
        })
      ),
  }))
);

export type WebCamStoreType = {
  webCam: WebCamType;
  updateWebCam: (updatedValues: Partial<WebCamType>) => void;
};
