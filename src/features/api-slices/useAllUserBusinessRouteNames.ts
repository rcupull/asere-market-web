import { useGetAllUserBusinessRouteNames } from 'features/api/useGetAllUserBusinessRouteNames';
import { useApiPersistent } from 'features/slices/useApiPersistent';

export const useAllUserBusinessRouteNames = () => {
  const { getAllUserBusinessRouteNames } = useGetAllUserBusinessRouteNames();

  const resource = useApiPersistent('useAllUserBusinessRouteNames', getAllUserBusinessRouteNames);

  return resource;
};
