import { useEffect, useState } from 'react'

declare global {
    interface Window {
        adsbygoogle: any
    }
}

export const GoogleAd = () => {
    const [showAds, setShowAds] = useState(false)

    useEffect(() => {
        setShowAds(true)
        showAds && (window.adsbygoogle = window.adsbygoogle || []).push({})
    }, [showAds])

    return (
        <>
            {showAds && (
                <ins
                    className="adsbygoogle"
                    style={{
                        display: 'inline-block',
                        width: '724px',
                        height: '90px',
                    }}
                    // style={{ display: 'block' }}
                    data-ad-client="ca-pub-6892058759603615"
                    data-ad-slot="6550229081"
                    // data-ad-format="auto"
                    // data-full-width-responsive="true"
                ></ins>
            )}
        </>
    )
}
