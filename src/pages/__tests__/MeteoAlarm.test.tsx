import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MeteoAlarm } from 'pages/MeteoAlarm';
import { renderWithProviders } from 'utils/test/testHelpers';

describe('MeteoAlarm Login page', () => {
  it('render <Login> component in loading phase', () => {
    renderWithProviders(<MeteoAlarm />);
    expect(screen.getByText(/Počet uživatelů: loading.../)).toBeInTheDocument();
    expect(screen.getByText(/Text: wind loading.../)).toBeInTheDocument();
    expect(screen.getByText(/rain loading.../)).toBeInTheDocument();
  });

  it('render <Login> component in loaded phase + test all 3 ReactQuery APIs', async () => {
    await renderWithProviders(<MeteoAlarm />);

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

  it('<Login> --> <ShowValues> --> <Alert>', async () => {
    await renderWithProviders(<MeteoAlarm />);

    const userInput = screen.getByPlaceholderText('Username or Email...');
    const passwordInput = screen.getByPlaceholderText('Password...');
    const submitButton = screen.getByRole('button', { name: /Přihlásit/i });

    fireEvent.change(userInput, { target: { value: 'Tomas' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByPlaceholderText('Username or Email...')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByPlaceholderText('Password...')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /Přihlásit/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Počet uživatelů: 253/)
      ).not.toBeInTheDocument();

      expect(screen.queryByText(/Tom4F MOCK/)).toBeInTheDocument();
    });

    const secondSubmitButton = screen.getByRole('button', { name: /Odeslat/i });
    fireEvent.click(secondSubmitButton);

    await waitFor(() => {
      expect(screen.queryByText(/Success !/)).toBeInTheDocument();
      expect(screen.queryByText(/data updated.../)).toBeInTheDocument();
    });
  });
});
