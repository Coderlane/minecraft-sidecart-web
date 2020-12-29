import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { auth } from '../services/firebase';

import Header from './Header';

jest.mock('../services/firebase', () => ({
  auth: jest.fn(),
}));

describe('Header', () => {
  it('defaults to sign in', async () => {
    auth.mockReturnValueOnce({
      currentUser: null,
    });
    render(<Header />);
    expect(screen.getByText('Sidecart'));
    expect(screen.queryByText('Servers') == null);
    expect(screen.getByText('Sign In'));
    expect(screen.queryByText('Sign Out') == null);
  });

  it('displays servers and sign out to authed users', async () => {
    auth.mockReturnValueOnce({
      currentUser: { email: 'example@gmail.com', uid: 1, emailVerified: true },
    });
    render(<Header />);
    expect(screen.getByText('Sidecart'));
    expect(screen.getByText('Servers'));
    expect(screen.queryByText('Sign In') == null);
    expect(screen.getByText('Sign Out'));
  });
});
