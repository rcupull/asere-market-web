import { Input } from '.';

import { FormikWrapper } from 'utils/storybook';

export default {
  component: Input,
};

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <Input name="name" />
  </FormikWrapper>
);

export const Label = (): JSX.Element => (
  <FormikWrapper>
    <Input name="name" label="Nombre" />
  </FormikWrapper>
);

export const Error = (): JSX.Element => (
  <FormikWrapper>
    <Input name="name" label="Nombre" error="invalid field" />
  </FormikWrapper>
);
