import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from 'react';
import App from './App';

describe('FizzBuzz', () => {
  const renderApp = async () => {
    render(<App/>)
  }

  const increment = async () => {
    await userEvent.click(screen.getByText("+1"));
  };

  const expectCounter = async (text: string) => {
    await waitFor(() => expect(screen.queryByText(text)).toBeInTheDocument());
  };

  it('renders the app', async () => {
    await renderApp();

    await expectCounter("Value: 1");
  });

  it('can increment the counter', async () => {
    await renderApp();

    await increment();
    await expectCounter("Value: 2");

    await increment();
    await expectCounter("Fizz");
  });

  it('can reset the counter', async () => {
    await renderApp();

    await userEvent.click(screen.getByText("Reset"));
    await expectCounter("Value: 1");
  })
});
