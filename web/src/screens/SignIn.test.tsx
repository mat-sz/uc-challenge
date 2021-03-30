import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import { SignIn } from './SignIn';
import { StoreType } from '../reducers';
import { newStore } from '../store';
import { act } from 'react-dom/test-utils';

fetchMock.enableMocks();

describe('SignIn', () => {
  it('authenticates the valid user', async () => {
    const mockAuthenticate = fetchMock.mockIf(
      req => req.url === '/api/v1/authentication',
      JSON.stringify({
        token: 'test',
        isAuthenticated: true,
        username: 'test',
        fullName: 'test',
      })
    );

    const store: StoreType = newStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      const signInButton = await screen.findByText(/Sign in/i, {
        selector: 'button',
      });

      fireEvent.change(screen.getByAltText(/Username/i), {
        target: { value: 'test' },
      });

      fireEvent.change(screen.getByAltText(/Password/i), {
        target: { value: 'test' },
      });

      signInButton.click();
    });

    expect(mockAuthenticate).toBeCalled();

    const state = store.getState();
    expect(state.authenticated).toBe(true);
    expect(state.fullName).toBe('test');
    expect(state.username).toBe('test');
  });

  it("doesn't authenticate the invalid user", async () => {
    const mockAuthenticate = fetchMock.mockIf(
      req => req.url === '/api/v1/authentication',
      JSON.stringify({
        isAuthenticated: false,
      })
    );

    const store: StoreType = newStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      const signInButton = await screen.findByText(/Sign in/i, {
        selector: 'button',
      });

      fireEvent.change(screen.getByAltText(/Username/i), {
        target: { value: 'test' },
      });

      fireEvent.change(screen.getByAltText(/Password/i), {
        target: { value: 'test' },
      });

      signInButton.click();
    });

    expect(mockAuthenticate).toBeCalled();

    const state = store.getState();
    expect(state.authenticated).toBe(false);
  });
});
