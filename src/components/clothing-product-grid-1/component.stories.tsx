import { ProductClothingSize1 } from 'components/product/clothing/product-clothing-size-1';
import { ProductColors1 } from 'components/product/colors/product-colors-1';
import { ProductDescription1 } from 'components/product/description/product-description-1';
import { ProductDetails1 } from 'components/product/details/product-details-1';
import { ProductHighLights1 } from 'components/product/hightlights/product-highlights-1';
import { ProductImages1 } from 'components/product/images/product-images-1';
import { ProductPrice1 } from 'components/product/price/product-price-1';
import { Review } from 'components/review';

import { ClothingProductGrid1 } from '.';

import { dummyPostClothing } from 'constants/dummies';
import { FormikWrapper } from 'utils/storybook';

export default {
  component: ClothingProductGrid1,
};

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <ClothingProductGrid1
      onAddToCar={(value) => {
        console.log('value', value);
      }}
      value={dummyPostClothing}
      render={{
        images: (props) => <ProductImages1 {...props} />,
        price: (props) => <ProductPrice1 {...props} />,
        review: (props) => <Review {...props} />,
        colors: (props) => <ProductColors1 {...props} />,
        clothingSize: (props) => <ProductClothingSize1 {...props} />,
        description: (props) => <ProductDescription1 {...props} />,
        highLights: (props) => <ProductHighLights1 {...props} />,
        details: (props) => <ProductDetails1 {...props} />,
      }}
    />
  </FormikWrapper>
);
