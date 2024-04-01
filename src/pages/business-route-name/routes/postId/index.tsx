import { useEffect, useMemo } from 'react';

import { ClothingProductGrid1 } from 'components/clothing-product-grid-1';
import { FieldClothingSizeSelect } from 'components/field-clothing-size-select';
import { FieldColorSelect } from 'components/field-colors-select';
import { PostsSectionsView } from 'components/posts-sections-view';
import { ProductDescription1 } from 'components/product/description/product-description-1';
import { ProductDetails1 } from 'components/product/details/product-details-1';
import { ProductHighLights1 } from 'components/product/hightlights/product-highlights-1';
import { ProductImages1 } from 'components/product/images/product-images-1';
import { ProductPrice1 } from 'components/product/price/product-price-1';
import { Review } from 'components/review';

import { useGetOnePost } from 'features/api/useGetOnePost';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { LayoutPage } from 'pages/@common/layout-page';
import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { PostsLayoutSection } from 'types/business';
import { getImageEndpoint } from 'utils/api';

export const PostId = () => {
  const { params } = useRouter();
  const { postId } = params;
  const { pushModal } = useModal();

  const { getOnePost } = useGetOnePost();
  const onRefresh = () => postId && getOnePost.fetch({ id: postId });
  const businessPageData = useBusinessPageData();

  useCallFromAfar(postId, onRefresh);

  useEffect(() => {
    if (postId) {
      onRefresh();
    }
  }, [postId]);

  const post = getOnePost.data;

  const business = businessPageData.business;

  const { postsSectionsBelowIds } = post || {};

  const sectionsBelow = useMemo<Array<PostsLayoutSection>>(() => {
    return (business?.layouts?.posts?.sections || []).filter(({ _id }) => {
      return postsSectionsBelowIds?.includes(_id);
    });
  }, [postsSectionsBelowIds, business]);

  if (!post || !business) {
    return <></>;
  }

  return (
    <UpdateSomethingContainer
      onClick={() => pushModal('PostNew', { postId: post._id, callAfarResources: postId })}
    >
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

        <PostsSectionsView
          business={business}
          onRefresh={() => businessPageData.onRefresh({ routeName: business.routeName })}
          layouts={sectionsBelow}
        />
      </LayoutPage>
    </UpdateSomethingContainer>
  );
};
