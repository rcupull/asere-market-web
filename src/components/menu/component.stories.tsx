import { Menu } from '.';

export default {
  component: Menu,
};

export const Default = (): JSX.Element => (
  <div style={{ height: '10rem', display: 'flex' }}>
    <Menu
      className="ml-auto"
      buttonElement="Click me"
      items={[
        { label: ' Your Profile', href: '/profile' },
        { label: 'Settings', href: '/settings' },
        { label: 'Sign out', href: '/signout' },
      ]}
    />
  </div>
);
