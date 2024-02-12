import { FieldInputImages } from '.';

import { FormikWrapper } from 'utils/storybook';

export default {
  component: FieldInputImages,
};

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <FieldInputImages name="field" id="name" />
  </FormikWrapper>
);

export const Label = (): JSX.Element => (
  <FormikWrapper>
    <FieldInputImages name="field" id="name" label="Nombre" />
  </FormikWrapper>
);

export const Error = (): JSX.Element => (
  <FormikWrapper errors={{ field: 'invalid field' }}>
    <FieldInputImages name="field" id="name" label="Nombre" />
  </FormikWrapper>
);
