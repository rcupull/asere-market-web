import { useAuth } from 'features/auth';

import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';

export const useImagesApi = (): {
  addPostImage: FetchResource<{ postImage: File; routeName: string }, { imageSrc: string }>;
} => {
  const addPostImageFetch = useFetch();

  const { authData } = useAuth();

  const userId = authData?.user._id || '<unknow user>';

  return {
    addPostImage: {
      data: addPostImageFetch[0],
      status: addPostImageFetch[1],
      fetch: ({ postImage, routeName }, options = {}) => {
        const form = new FormData();
        form.append('postImage', postImage);

        addPostImageFetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/user/:userId/business/:routeName/postImage',
              urlParams: { userId, routeName },
            }),
            data: form,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
          options,
        );
      },
    },
  };
};
