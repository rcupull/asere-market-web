import { RefObject, useState } from 'react';

export const useScrollBottom = (
  ref: RefObject<HTMLElement>,
  onScrollBottom?: () => void,
): {
  onScroll: () => void;
} => {
  const [fromUp, setFromUp] = useState(false);

  return {
    onScroll: () => {
      if (ref?.current) {
        const { scrollTop, clientHeight, scrollHeight } = ref.current;

        if (Math.abs(scrollTop + clientHeight - scrollHeight) > 100) {
          setFromUp(true);
        }

        if (Math.abs(scrollTop + clientHeight - scrollHeight) <= 2 && fromUp) {
          setFromUp(false);
          onScrollBottom?.();
        }
      }
    },
  };
};
