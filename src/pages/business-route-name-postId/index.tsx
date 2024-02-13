import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ClothingProductGrid1 } from 'components/clothing-product-grid-1';
import { FieldClothingSizeSelect } from 'components/field-clothing-size-select';
import { FieldColorSelect } from 'components/field-colors-select';
import { ProductDescription1 } from 'components/product/description/product-description-1';
import { ProductDetails1 } from 'components/product/details/product-details-1';
import { ProductHighLights1 } from 'components/product/hightlights/product-highlights-1';
import { ProductImages1 } from 'components/product/images/product-images-1';
import { ProductPrice1 } from 'components/product/price/product-price-1';
import { Review } from 'components/review';

import { useGetOnePost } from 'features/api/useGetOnePost';
import { useUserPostsApi } from 'features/api/useUserPostsApi';
import { useAuth } from 'features/auth';

import { LayoutPage } from 'pages/@common/layout-page';
import { getImageEndpoint } from 'utils/api';

export const BusinessRouteNamePostId = () => {
  const { postId } = useParams();

  const { isAuthenticated } = useAuth();

  const { getOnePost } = useGetOnePost();
  const { getOneUserPost } = useUserPostsApi();

  const getOnePostApi = isAuthenticated ? getOneUserPost : getOnePost;

  useEffect(() => {
    if (postId) {
      getOnePostApi.fetch({ id: postId });
    }
  }, [postId]);

  const post = getOnePostApi.data;

  return (
    <LayoutPage title={post?.name} backButton>
      <ClothingProductGrid1
        onAddToCar={(value) => {
          console.log('value', value);
        }}
        getImageUrl={getImageEndpoint}
        value={post}
        render={{
          images: (props) => <ProductImages1 {...props} />,
          price: (props) => <ProductPrice1 {...props} />,
          review: (props) => <Review {...props} />,
          colors: (props) => <FieldColorSelect {...props} />,
          clothingSize: (props) => <FieldClothingSizeSelect {...props} />,
          description: (props) => <ProductDescription1 {...props} />,
          highLights: (props) => <ProductHighLights1 {...props} />,
          details: (props) => <ProductDetails1 {...props} />,
        }}
      />
    </LayoutPage>
  );
};
