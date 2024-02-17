import { UserMenu } from '.';

export default {
  component: UserMenu,
};

export const Default = (): JSX.Element => (
  <div style={{ height: '10rem', display: 'flex' }}>
    <UserMenu
      className="ml-auto"
      items={[
        { label: ' Your Profile', href: '/profile' },
        { label: 'Settings', href: '/settings' },
        { label: 'Sign out', href: '/signout' },
      ]}
    />
  </div>
);
