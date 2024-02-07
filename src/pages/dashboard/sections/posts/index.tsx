import { useEffect } from 'react';

import { Table } from 'components/table';

import { useFetch } from 'hooks/useFetch';

import { getEndpoint } from 'utils/api';

export const SectionPosts = () => {
  const [, , handleFetchPosts] = useFetch();

  useEffect(() => {
    handleFetchPosts({
      method: 'get',
      url: getEndpoint({
        path: '/posts',
      }),
    });
  }, []);

  return (
    <div>
      <Table
        heads={[]}
        getRowProps={() => ({
          nodes: [],
        })}
        data={[]}
      />
    </div>
  );
};
