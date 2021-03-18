import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeleteAccount } from './DeleteAccount';
import { ThemeProvider } from 'styled-components';
import theme from '@weco/common/views/themes/default';
import { ChangeDetailsModalContentProps } from './ChangeDetailsModal';

const renderComponent = (props: Partial<ChangeDetailsModalContentProps> = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <DeleteAccount onComplete={() => null} onCancel={() => null} {...props} />
    </ThemeProvider>
  );

describe('DeleteAccount', () => {
  it('renders correctly', () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: /delete this account/i })).toBeInTheDocument();
  });

  it('allows the user to enter their password', () => {
    renderComponent();
    const currentPasswordInput = screen.getByLabelText(/^password$/i);
    userEvent.type(currentPasswordInput, 'hunter2');
    expect(currentPasswordInput).toHaveValue('hunter2');
  });

  it('allows the user to request account deletion after confirming their password', async () => {
    const onComplete = jest.fn();
    renderComponent({ onComplete });
    userEvent.type(screen.getByLabelText(/^password$/i), 'hunter2');
    userEvent.click(screen.getByRole('button', { name: /yes, delete my account/i }));
    expect(await screen.findByRole('progressbar')).toBeInTheDocument();
    await waitFor(() => expect(onComplete).toBeCalled());
  });

  it('allows the user to cancel the operation', () => {
    const onCancel = jest.fn();
    renderComponent({ onCancel });
    userEvent.click(screen.getByRole('link', { name: /no, take me back to my account/i }));
    expect(onCancel).toHaveBeenCalled();
  });

  describe('shows an error on submission', () => {
    it('with an empty current password field', async () => {
      renderComponent();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: /yes, delete my account/i }));
      expect(await screen.findByRole('alert')).toHaveTextContent(/enter your current password/i);
    });
  });
});