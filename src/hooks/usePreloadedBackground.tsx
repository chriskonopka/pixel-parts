import * as React from 'react';

const usePreloadedBackground = (url?: string): string | undefined => {
  const [currentUrl, setCurrentUrl] = React.useState<string | undefined>(url);

  React.useEffect(() => {
    if (!url) return;
    if (url === currentUrl) return;

    let cancelled = false;
    const img = new Image();
    img.src = url;
    img.onload = () => {
      if (!cancelled) setCurrentUrl(url);
    };

    return () => {
      cancelled = true;
    };
  }, [url, currentUrl]);

  return currentUrl;
}

export default usePreloadedBackground;