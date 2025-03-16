import { screen, waitFor } from '@testing-library/react';
import { MeteoBarBig } from 'components/Start';
import { renderWithProviders } from 'utils/test/testHelpers';

describe('MeteoBarBig', () => {
  it('displays loading text', () => {
    renderWithProviders(<MeteoBarBig />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
  it('displays the MeteoBarBig with meteo data', async () => {
    await renderWithProviders(<MeteoBarBig />);

    await waitFor(
      () => {
        expect(
          screen.getByText(/METEOSTANICE 22.01.2025/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/Tlak/i)).toBeInTheDocument();
        expect(screen.getByText(/1018.1 hPa/i)).toBeInTheDocument();
        expect(screen.getByText(/Voda na Lipně/i)).toBeInTheDocument();
        expect(screen.getByText(/hladina/i)).toBeInTheDocument();
        expect(screen.getByText(/723.44 m n.m./i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('contains a fieldset with the correct style', async () => {
    await renderWithProviders(<MeteoBarBig />);

    await waitFor(
      () => {
        const fieldsets = screen.getAllByRole('group');
        expect(fieldsets.length).toBe(6);

        const firstFieldset = fieldsets[0];
        const firstFieldsetComputedStyle = getComputedStyle(firstFieldset);
        expect(firstFieldsetComputedStyle.border).toBe('2px solid green');

        const lastFieldset = fieldsets[5];
        const lastFieldsetComputedStyle = getComputedStyle(lastFieldset);
        expect(lastFieldsetComputedStyle.color).toBe('rgb(255, 255, 255)');
      },
      { timeout: 3000 }
    );
  });
});
