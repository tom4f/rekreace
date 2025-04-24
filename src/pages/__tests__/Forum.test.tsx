import { act, screen, waitFor } from '@testing-library/react';
import { Forum } from 'pages/Forum';
import { renderWithProviders } from 'utils/test/testHelpers';

const defaultData = {
  isIntersecting: true,
  target: document.createElement('div'),
  intersectionRatio: 0.5,
  time: 0,
  boundingClientRect: {} as DOMRectReadOnly,
  intersectionRect: {} as DOMRectReadOnly,
  rootBounds: null,
};

describe('Forum page', () => {
  let observerCallback: IntersectionObserverCallback;

  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn((cb) => {
        observerCallback = cb;
        return {
          root: null,
          rootMargin: '',
          thresholds: [0],
          observe: vi.fn(),
          unobserve: vi.fn(),
          disconnect: vi.fn(),
          takeRecords: vi.fn(),
        };
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('render <Forum> page in loading phase', () => {
    renderWithProviders(<Forum />);
    expect(screen.getByText(/Lipenské fórum/)).toBeInTheDocument();
  });

  it('render <Forum> component in loaded phase', async () => {
    await renderWithProviders(<Forum />);

    await waitFor(() => {
      expect(screen.getByText(/Tomáš/)).toBeInTheDocument();
      expect(screen.getAllByText(/Bedřich/)).toHaveLength(8);
      expect(screen.getAllByText(/Fórum/)).toHaveLength(7);
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

  it('loads more data when scrolled to the bottom', async () => {
    renderWithProviders(<Forum />);

    await waitFor(() => {
      expect(screen.getByText(/OnlyFirstPageName/)).toBeInTheDocument();
      expect(screen.queryByText(/OnlySecondPageName/)).not.toBeInTheDocument();
      expect(screen.queryByText(/OnlyThirdPageName/)).not.toBeInTheDocument();
    });

    // Simulate 1st intersection
    act(() => observerCallback([defaultData], {} as IntersectionObserver));
    act(() => observerCallback([defaultData], {} as IntersectionObserver));

    // Wait for new data to appear
    await waitFor(() => {
      expect(screen.getByText(/OnlyFirstPageName/)).toBeInTheDocument();
      expect(screen.getByText(/OnlySecondPageName/)).toBeInTheDocument();
      expect(screen.queryByText(/OnlyThirdPageName/)).not.toBeInTheDocument();
    });

    // Simulate 2nd intersection
    act(() => observerCallback([defaultData], {} as IntersectionObserver));

    // Wait for new data to appear
    await waitFor(() => {
      expect(screen.getByText(/OnlyFirstPageName/)).toBeInTheDocument();
      expect(screen.getByText(/OnlySecondPageName/)).toBeInTheDocument();
      expect(screen.getByText(/OnlyThirdPageName/)).toBeInTheDocument();
    });
  });
});
