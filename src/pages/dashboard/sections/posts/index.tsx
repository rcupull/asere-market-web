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
      <div className="flex w-full">
        {/* <Button label="Nuevo" onClick={() => pushModal('PostNew', { businessId})} className="ml-auto" /> */}
      </div>
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
