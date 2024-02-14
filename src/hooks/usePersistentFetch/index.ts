import { useEffect } from 'react';

import { UseFetchReturn } from 'hooks/useFetch';

export const usePersistentFetch = <T extends UseFetchReturn = UseFetchReturn>(
  fetch: T,
  record: { data: any },
): T => {
  const [data, , , handleReset] = fetch;

  useEffect(() => {
    record.data = data;
  }, [JSON.stringify(data)]);

  //@ts-expect-error ignore
  return [
    record.data || data,
    fetch[1],
    fetch[2],
    () => {
      record.data = null;
      handleReset();
    },
  ];
};
