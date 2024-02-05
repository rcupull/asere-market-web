import { useEffect } from "react";
import { Table } from "../../../../components/table";
import { useFetch } from "../../../../hooks/useFetch";
import { getEndpoint } from "../../../../utils/api";
import { Button } from "../../../../components/button";
import { useModal } from "../../../../features/modal";

export const SectionPosts = () => {
  const [, , handleFetchPosts] = useFetch();


  const { pushModal } = useModal();


  useEffect(() => {
    handleFetchPosts({
      method: "get",
      url: getEndpoint({
        path: "/posts",
      }),
    });
  }, []);

  return (
    <div>
      <div className="flex w-full">
        <Button label="Nuevo" onClick={() => pushModal('PostNew', {})} className="ml-auto" />
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
