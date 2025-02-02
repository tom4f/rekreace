import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from 'utils/test/testHelpers';
import { describe, expect, it } from 'vitest';

import { Login } from '../Login';

describe('MeteoAlarm Login page', () => {
  it('displays login form in loading phase', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(/Počet uživatelů: loading.../)).toBeInTheDocument();
    expect(screen.getByText(/Text: wind loading.../)).toBeInTheDocument();
    expect(screen.getByText(/rain loading.../)).toBeInTheDocument();
  });

  it('displays login page in loaded phase + test all 3 ReactQuery APIs', async () => {
    await renderWithProviders(<Login />);

    await waitFor(() => {
      expect(screen.getByText(/Počet uživatelů: 253/)).toBeInTheDocument();
      expect(
        screen.getByText(
          /Vitr NNE 10:02\/1.4\/3.1 9:47\/1.3\/3.1 9:32\/1.6\/3.6 9:17\/1.8\/4.5 MaxDne:9.8m\/s TedMaxMin\['C\] -2.9\/-0.6\/-3.7 Rain:0.0mm LIPNOnet.cz\/4f !/
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /todayRain : 2.8mm, todayRainMaxRate : 12.6mm\/h, LIPNO.net/
        )
      ).toBeInTheDocument();
    });
  });
});
