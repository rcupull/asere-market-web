import { useFetch } from 'hooks/useFetch';

import { useAuthSignIn } from './useAuthSignIn';

import { FetchResource } from 'types/api';
import { Image, ImageFile } from 'types/general';
import { getEndpoint } from 'utils/api';

export const useAddManyUserBusinessImages = (): {
  addManyUserBusinessImages: FetchResource<
    { images: Array<ImageFile | Image>; routeName: string },
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
            if (image.src instanceof File) {
              const form = new FormData();
              form.append('image', image.src);

              fetch[2](
                {
                  method: 'post',
                  url: getEndpoint({
                    path: '/user/:userId/image',
                    urlParams: { userId },
                    query: { routeName },
                  }),
                  data: form,
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                },
                {
                  onAfterSuccess: (response) => {
                    resolve({
                      ...image,
                      src: response.imageSrc,
                    });
                  },
                },
              );
            } else {
              resolve(image as Image);
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
