import { Button } from ".";

export default {
  component: Button,
};

export const Default = (): JSX.Element => <Button label="Label" />;

export const IsBusy = (): JSX.Element => <Button label="Label" isBusy />;

export const Designs = (): JSX.Element => (
  <>
    <Button label="Primary" variant="primary" />
    <br />
    <br />
    <Button label="Outlined" variant="outlined" />
    <br />
    <br />
    <Button label="Error" variant="error" />
  </>
);

export const Disabled = (): JSX.Element => (
  <>
    <Button label="Primary" variant="primary" disabled />
    <br />
    <br />
    <Button label="Outlined" variant="outlined" disabled />
    <br />
    <br />
    <Button label="Error" variant="error" disabled />
  </>
);
