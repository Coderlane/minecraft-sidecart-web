import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { UserProvider } from './UserContext';
import Header from './Header';

describe('Header', () => {
  it('defaults to sign in', async () => {
    render(
      <UserProvider value={{ user: null, loading: false }}>
        <Header />
      </UserProvider>,
    );
    expect(screen.getByText('Sidecart'));
    expect(screen.queryByText('Servers') == null);
    expect(screen.getByText('Sign In'));
    expect(screen.queryByText('Sign Out') == null);
  });

  it('displays servers and sign out to authed users', async () => {
    const user = { email: 'example@gmail.com', uid: 1, emailVerified: true };
    render(
      <UserProvider value={{ user, loading: false }}>
        <Header />
      </UserProvider>,
    );
    expect(screen.getByText('Sidecart'));
    expect(screen.getByText('Servers'));
    expect(screen.queryByText('Sign In') == null);
    expect(screen.getByText('Sign Out'));
  });
});
