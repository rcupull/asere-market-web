import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ClothingProductGrid1 } from 'components/clothing-product-grid-1';
import { FieldColorSelect } from 'components/field-colors-select';
import { ProductClothingSize1 } from 'components/product/clothing/product-clothing-size-1';
import { ProductDescription1 } from 'components/product/description/product-description-1';
import { ProductDetails1 } from 'components/product/details/product-details-1';
import { ProductHighLights1 } from 'components/product/hightlights/product-highlights-1';
import { ProductImages1 } from 'components/product/images/product-images-1';
import { ProductPrice1 } from 'components/product/price/product-price-1';
import { Review } from 'components/review';

import { usePostsApi } from 'features/post/api';

import { dummyPostClothing } from 'constants/dummies';
import { LayoutPage } from 'pages/@common/layout-page';

export const BusinessRouteNamePostId = () => {
  const { postId } = useParams();

  const postApi = usePostsApi();

  useEffect(() => {
    if (postId) {
      postApi.getOne.fetch({ id: postId });
    }
  }, [postId]);

  const post = postApi.getOne.data;

  return (
    <LayoutPage title={post?.name} backButton>
      <ClothingProductGrid1
        onAddToCar={(value) => {
          console.log('value', value);
        }}
        value={dummyPostClothing}
        render={{
          images: (props) => <ProductImages1 {...props} />,
          price: (props) => <ProductPrice1 {...props} />,
          review: (props) => <Review {...props} />,
          colors: (props) => <FieldColorSelect {...props} />,
          clothingSize: (props) => <ProductClothingSize1 {...props} />,
          description: (props) => <ProductDescription1 {...props} />,
          highLights: (props) => <ProductHighLights1 {...props} />,
          details: (props) => <ProductDetails1 {...props} />,
        }}
      />
    </LayoutPage>
  );
};
