import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useAddManyUserBusinessImages = (): {
  addManyUserBusinessImages: FetchResource<
    { images: Array<File>; routeName: string },
    [{ imageSrc: string }]
  >;
} => {
  const fetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    addManyUserBusinessImages: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ images, routeName }, options = {}) => {
        fetch[2](
          images.map((image) => {
            const form = new FormData();
            form.append('image', image);

            return {
              method: 'post',
              url: getEndpoint({
                path: '/user/:userId/business/:routeName/image',
                urlParams: { userId, routeName },
              }),
              data: form,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            };
          }),
          options,
        );
      },
      reset: fetch[3],
    },
  };
};
