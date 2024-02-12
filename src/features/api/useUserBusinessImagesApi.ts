import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useUserBusinessImagesApi = (): {
  addManyUserBusinessImages: FetchResource<
    { images: Array<File>; routeName: string },
    [{ imageSrc: string }]
  >;
} => {
  const addManyUserBusinessImagesFetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    addManyUserBusinessImages: {
      data: addManyUserBusinessImagesFetch[0],
      status: addManyUserBusinessImagesFetch[1],
      fetch: ({ images, routeName }, options = {}) => {
        addManyUserBusinessImagesFetch[2](
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
    },
  };
};
