import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

export const GoogleAd = ({ counter }: { counter: number }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Adsbygoogle error:', e);
      }
    }
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div
        style={{
          maxWidth: '724px',
          height: '90px',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #ccc',
        }}
      >
        <span>Google Ad Placeholder {counter}</span>
      </div>
    );
  }

  return (
    <ins
      className='adsbygoogle'
      style={{ display: 'block', maxWidth: '724px', height: '90px' }}
      data-ad-client='ca-pub-6892058759603615'
      data-ad-slot='6550229081'
      data-ad-format='auto'
      data-full-width-responsive='true'
    ></ins>
  );
};
