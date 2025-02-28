import { act, renderHook } from '@testing-library/react';
import {
  LOCAL_STORAGE_KEY,
  MeteoDates,
  useDateStore,
} from 'store/useMeteoStore';
import { beforeEach, describe, expect, it } from 'vitest';

describe('useDateStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with default dates', () => {
    const { result } = renderHook(() => useDateStore());

    expect(result.current.dates.davisDaily).toBeInstanceOf(Date);
    expect(result.current.dates.oldStationDaily).toEqual(new Date(2012, 8, 22));
  });

  it('should update a date', () => {
    const { result } = renderHook(() => useDateStore());

    const newDate = new Date(2025, 5, 15);
    act(() => {
      result.current.updateDate(MeteoDates.DAVIS_DAILY, newDate);
    });

    expect(result.current.dates.davisDaily).toEqual(newDate);
  });

  it('should reset a date to default', () => {
    const { result } = renderHook(() => useDateStore());

    act(() => {
      result.current.updateDate(
        MeteoDates.OLD_STATION_DAILY,
        new Date(2030, 0, 1)
      );
    });

    act(() => {
      result.current.resetDate(MeteoDates.OLD_STATION_DAILY);
    });

    expect(result.current.dates.oldStationDaily).toEqual(new Date(2012, 7, 22));
  });

  it('should persist state in localStorage', async () => {
    const { result } = renderHook(() => useDateStore());

    const lipnoDate = new Date(2024, 6, 20);
    const davisDate = new Date(2023, 0, 2);
    const davisTextSummaryDate = new Date(2022, 7, 1);
    const oldStationDate = new Date(2025, 11, 20);

    act(() => {
      result.current.updateDate(MeteoDates.LIPNO_DAILY, lipnoDate);
      result.current.updateDate(MeteoDates.DAVIS_DAILY, davisDate);
      result.current.updateDate(
        MeteoDates.DAVIS_TEXT_SUMMARY,
        davisTextSummaryDate
      );
      result.current.updateDate(MeteoDates.OLD_STATION_DAILY, oldStationDate);
    });

    const storedState = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}'
    );

    expect(storedState).toBeTruthy();
    expect(storedState.state.dates.lipnoDaily).toEqual(lipnoDate.toISOString());
    expect(storedState.state.dates.davisDaily).toEqual(davisDate.toISOString());
    expect(storedState.state.dates.davisTextSummary).toEqual(
      davisTextSummaryDate.toISOString()
    );
    expect(storedState.state.dates.oldStationDaily).toEqual(
      oldStationDate.toISOString()
    );
  });

  it('should reset state also in localStorage', async () => {
    const { result } = renderHook(() => useDateStore());

    const todayDate = new Date(2025, 0, 27);
    const oldStationDate = new Date(2012, 7, 22);

    vi.useFakeTimers();
    vi.setSystemTime(new Date(todayDate));

    act(() => {
      result.current.resetDate(MeteoDates.LIPNO_DAILY);
      result.current.resetDate(MeteoDates.DAVIS_DAILY);
      result.current.resetDate(MeteoDates.DAVIS_TEXT_SUMMARY);
      result.current.resetDate(MeteoDates.OLD_STATION_DAILY);
    });

    const storedState = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}'
    );

    expect(storedState).toBeTruthy();
    expect(storedState.state.dates.lipnoDaily).toEqual(todayDate.toISOString());
    expect(storedState.state.dates.davisDaily).toEqual(todayDate.toISOString());
    expect(storedState.state.dates.davisTextSummary).toEqual(
      todayDate.toISOString()
    );
    expect(storedState.state.dates.oldStationDaily).toEqual(
      oldStationDate.toISOString()
    );

    vi.useRealTimers();
  });
});
