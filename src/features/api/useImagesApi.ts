import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useImagesApi = (): {
  addPostImages: FetchResource<
    { postImages: Array<File>; routeName: string },
    [{ imageSrc: string }]
  >;
} => {
  const addPostImageFetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    addPostImages: {
      data: addPostImageFetch[0],
      status: addPostImageFetch[1],
      fetch: ({ postImages, routeName }, options = {}) => {
        addPostImageFetch[2](
          postImages.map((postImage) => {
            const form = new FormData();
            form.append('postImage', postImage);

            return {
              method: 'post',
              url: getEndpoint({
                path: '/user/:userId/business/:routeName/postImage',
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
