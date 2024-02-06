import { useEffect } from "react";
import { Button } from "../../../../components/button";
import { useModal } from "../../../../features/modal";
import { useBusinessApi } from "../../../../features/business/api";
import { useParams } from "../../../../hooks/useReactRouter";
import { TabelPosts } from "./table-posts";

export const SectionBusinessSelected = () => {
  const { businessId } = useParams();

  const bussiness = useBusinessApi();

  const { pushModal } = useModal();

  useEffect(() => {
    onGetBussiness();
  }, []);

  if (!businessId) {
    return <></>;
  }

  const onGetBussiness = () => bussiness.getOne.fetch({ id: businessId });

  return (
    <div>
      <div className="flex w-full">
        <Button
          label="Nuevo"
          onClick={() =>
            pushModal("PostNew", {
              businessId,
              onAfterSuccess: () => onGetBussiness(),
            })
          }
          className="ml-auto"
        />
      </div>
      <TabelPosts businessId={businessId} />
    </div>
  );
};
