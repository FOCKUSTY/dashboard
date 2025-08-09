import { useCallback, useEffect, useState } from "react"

export const useMediaQuery = (query: string) => {
  const [targetReached, setTargetReached] = useState(false)

  const updateTarget = useCallback((event: MediaQueryListEvent) => {
    if (event.matches) {
      setTargetReached(true)
    } else {
      setTargetReached(false)
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia(query);
    media.addEventListener('change', updateTarget);

    if (media.matches) {
      setTargetReached(true)
    };

    return () => media.removeEventListener('change', updateTarget)
  }, [query, updateTarget]);

  return targetReached;
}

export default useMediaQuery;
