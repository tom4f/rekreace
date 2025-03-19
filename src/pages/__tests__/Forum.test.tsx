import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Forum } from 'pages/Forum';
import { renderWithProviders } from 'utils/test/testHelpers';

describe('Forum page', () => {
  it('render <Forum> page in loading phase', () => {
    renderWithProviders(<Forum />);
    expect(screen.getByText(/Lipenské fórum/)).toBeInTheDocument();
  });

  it('render <Forum> component in loaded phase', async () => {
    await renderWithProviders(<Forum />);

    await waitFor(() => {
      expect(screen.getByText(/11 komentářů./)).toBeInTheDocument();
      expect(screen.getByText(/Tomáš/)).toBeInTheDocument();
      expect(screen.getAllByText(/Bedřich/)).toHaveLength(4);
      expect(screen.getAllByText(/Fórum/)).toHaveLength(5);
      expect(
        screen.getByText(/K obsahu stránek - 2024-11-22/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /bruslařská dráha - ovál ve Frymburku cca 4 km a směr k Lipnu nad Vltavou. Kvalita ledu na oválu dobrá a směr k Lipnu horší./
        )
      ).toBeInTheDocument();
    });
  });

  it('render <Forum> and click on second page', async () => {
    await renderWithProviders(<Forum />);

    await waitFor(() => {
      expect(screen.getByText(/11 komentářů./)).toBeInTheDocument();
    });
    const submitButton = screen.getByRole('button', { name: /1/ });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/K obsahu stránek - 2024-06-08/)
      ).toBeInTheDocument();
      expect(screen.getByText(/Seznamka - 2024-06-19/)).toBeInTheDocument();
      expect(screen.getByText(/Inzerce - 2024-06-25/)).toBeInTheDocument();
      expect(screen.getByText(/Fórum - 2024-07-11/)).toBeInTheDocument();
      expect(screen.getAllByText(/Bedřich/)).toHaveLength(5);
      expect(
        screen.getByText(
          /teplota vody ve Frymburku v hloubce cca 40 cm je 20.2 st.C/
        )
      ).toBeInTheDocument();
    });
  });
});
