import { Navigate } from 'react-router-dom';

import { ButtonNew } from 'components/button-new';

import { useGetAllUserBusiness } from 'features/api/useGetAllUserBusiness';
import { useModal } from 'features/modal/useModal';

import { callAfarIds } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

export const Home = () => {
  const { getAllUserBussiness } = useGetAllUserBusiness();

  const { pushModal } = useModal();
  const { pathname } = useRouter();
  const firstBusiness = getAllUserBussiness.data?.[0];

  if (firstBusiness) {
    return <Navigate to={`${pathname}/${firstBusiness.routeName}`} />;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <p>Inicia en el mundo tecnológico publicando tu primer negocio online.</p>
      <ButtonNew
        className="mt-6"
        label="Crear mi primer negocio"
        onClick={() =>
          pushModal('BusinessNew', { callAfarResources: callAfarIds.getAllUserBussiness })
        }
      />
    </div>
  );
};
