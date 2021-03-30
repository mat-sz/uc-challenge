import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import { Dashboard } from './Dashboard';
import { StoreType } from '../reducers';
import { newStore } from '../store';
import { act } from 'react-dom/test-utils';

fetchMock.enableMocks();

describe('Dashboard', () => {
  it('deauthenticates the user', async () => {
    const store: StoreType = newStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => {
      const logOutButton = await screen.findByText(/Log out/i, {
        selector: 'button',
      });

      logOutButton.click();
    });

    const state = store.getState();
    expect(state.authenticated).toBe(false);
  });
});
