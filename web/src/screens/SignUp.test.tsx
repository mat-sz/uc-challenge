import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import { StoreType } from '../reducers';
import { newStore } from '../store';
import { SignUp } from './SignUp';

fetchMock.enableMocks();

describe('SignUp', () => {
  it('creates an user with valid data', async () => {
    const mockAuthenticate = fetchMock.mockIf(
      () => true,
      JSON.stringify({
        token: 'test',
        isAuthenticated: true,
        username: 'test',
        fullName: 'test 12',
      })
    );

    const store: StoreType = newStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      const signUpButton = await screen.findByText(/Sign up/i, {
        selector: 'button',
      });

      fireEvent.change(screen.getByAltText(/Username/i), {
        target: { value: 'test' },
      });

      fireEvent.change(screen.getByAltText(/Full name/i), {
        target: { value: 'test 12' },
      });

      fireEvent.change(screen.getByAltText(/E-mail/i), {
        target: { value: 'test@test.com' },
      });

      fireEvent.change(screen.getByAltText(/Password/), {
        target: { value: 'test1234' },
      });

      fireEvent.change(screen.getByAltText(/Confirm password/i), {
        target: { value: 'test1234' },
      });

      signUpButton.click();
    });

    expect(mockAuthenticate).toBeCalled();

    const state = store.getState();
    expect(state.authenticated).toBe(true);
    expect(state.fullName).toBe('test 12');
    expect(state.username).toBe('test');
  });

  it('displays errors for invalid data', async () => {
    const mockAuthenticate = fetchMock.mockIf(
      () => true,
      JSON.stringify({
        token: 'test',
        isAuthenticated: true,
        username: 'test',
        fullName: 'test 12',
      })
    );

    const store: StoreType = newStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      const signUpButton = await screen.findByText(/Sign up/i, {
        selector: 'button',
      });

      fireEvent.change(screen.getByAltText(/Username/i), {
        target: { value: 't' },
      });

      fireEvent.change(screen.getByAltText(/Full name/i), {
        target: { value: 't' },
      });

      fireEvent.change(screen.getByAltText(/E-mail/i), {
        target: { value: 't' },
      });

      fireEvent.change(screen.getByAltText(/Password/), {
        target: { value: 't' },
      });

      fireEvent.change(screen.getByAltText(/Confirm password/i), {
        target: { value: 't' },
      });

      signUpButton.click();
    });

    expect(mockAuthenticate).not.toBeCalled();

    const state = store.getState();
    expect(state.authenticated).toBe(false);

    expect(
      await screen.findByText('Full name must be longer than 5 characters.')
    ).not.toBeUndefined();
    expect(await screen.findByText('Email must be valid.')).not.toBeUndefined();
    expect(
      await screen.findByText('Password must contain at least one number.')
    ).not.toBeUndefined();
  });
});
