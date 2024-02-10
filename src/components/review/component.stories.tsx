import { Review } from '.';

export default {
  component: Review,
};

export const Undefined = (): JSX.Element => <Review />;

export const NoReview = (): JSX.Element => (
  <Review
    value={{
      average: 0,
      totalCount: 0,
    }}
  />
);

export const OneReview = (): JSX.Element => (
  <Review
    value={{
      average: 4,
      totalCount: 1,
    }}
  />
);

export const SomeReviews = (): JSX.Element => (
  <Review
    value={{
      average: 4,
      totalCount: 500,
    }}
  />
);
