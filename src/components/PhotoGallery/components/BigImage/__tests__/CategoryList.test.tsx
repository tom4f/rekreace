import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from 'utils/test/testHelpers';

import { CategoryList } from '../CategoryList';

describe('CategoryList component', () => {
  it('displays CategoryList icon in loading phase', () => {
    renderWithProviders(<CategoryList />);
    expect(screen.queryByTestId('category-icon')).not.toBeInTheDocument();
  });

  it('displays CategoryList icon in loaded phase', async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      expect(screen.getByTestId('category-icon')).toBeInTheDocument();
    });
  });

  it('displays CategoryList when hovered over the icon and hide list when unhovered', async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      expect(screen.queryByTestId('category-icon')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('category-list')).not.toBeInTheDocument();

    const icon = screen.getByTestId('category-icon');

    await userEvent.hover(icon);

    await waitFor(() => {
      expect(screen.getByTestId('category-list')).toBeInTheDocument();
    });

    expect(screen.getByText(/Kategorie \/ počet fotek/i)).toBeInTheDocument();
    expect(screen.getByText(/Lipenská přehrada/i)).toBeInTheDocument();
    expect(screen.getByText(/Historie/i)).toBeInTheDocument();
    expect(screen.getByText(/Jawa450/i)).toBeInTheDocument();
    expect(screen.getByText(/Všechny/i)).toBeInTheDocument();

    const list = screen.getByTestId('category-list');

    await userEvent.unhover(list);

    await waitFor(() => {
      expect(list).not.toBeInTheDocument();
    });
  });
});
