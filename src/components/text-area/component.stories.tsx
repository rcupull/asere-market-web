import { TextArea } from '.';

import { FormikWrapper } from 'utils/storybook';

export default {
  component: TextArea,
};

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <TextArea name="field" />
  </FormikWrapper>
);

export const Label = (): JSX.Element => (
  <FormikWrapper>
    <TextArea name="field" label="Nombre" />
  </FormikWrapper>
);

export const Error = (): JSX.Element => (
  <FormikWrapper errors={{ field: 'invalid field' }}>
    <TextArea name="field" label="Nombre" />
  </FormikWrapper>
);
