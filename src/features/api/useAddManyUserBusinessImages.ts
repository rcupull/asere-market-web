import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { Image } from 'types/general';
import { getEndpoint } from 'utils/api';

export const useAddManyUserBusinessImages = (): {
  addManyUserBusinessImages: FetchResource<
    { images: Array<File | Image>; routeName: string },
    Array<Image>
  >;
} => {
  const fetch = useFetch();

  const { authData } = useAuthSignIn();

  const userId = authData?.user._id || '<unknow user>';

  return {
    addManyUserBusinessImages: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ images, routeName }, options = {}) => {
        const promises = images.map((image) => {
          return new Promise<Image>((resolve) => {
            if (image instanceof File) {
              const form = new FormData();
              form.append('image', image);

              fetch[2](
                {
                  method: 'post',
                  url: getEndpoint({
                    path: '/user/:userId/business/:routeName/image',
                    urlParams: { userId, routeName },
                  }),
                  data: form,
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                },
                {
                  onAfterSuccess: (response) => {
                    resolve({
                      src: response.imageSrc,
                    });
                  },
                },
              );
            } else {
              resolve(image);
            }
          });
        });

        Promise.all(promises).then((images) => {
          const { onAfterSuccess } = options || {};

          onAfterSuccess?.(images);
        });
      },
      reset: fetch[3],
    },
  };
};
