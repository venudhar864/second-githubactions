import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

describe('App', () => {
  it('renders the seeded sessions', () => {
    render(<App />);
    expect(screen.getByText('Pair on the payments bug')).toBeInTheDocument();
  });

  it('adds a session from the form', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/what are you working on/i), 'Draft the RFC');
    await user.click(screen.getByRole('button', { name: /add session/i }));

    expect(screen.getByText('Draft the RFC')).toBeInTheDocument();
  });

  it('shows an error instead of adding an unnamed session', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /add session/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/name the session/i);
  });

  it('marks a session complete and updates the totals', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Scoped to the checkbox: the delete button's label mentions the name too.
    await user.click(screen.getByRole('checkbox', { name: /pair on the payments bug/i }));

    expect(screen.getByText('2h 15m')).toBeInTheDocument();
  });

  it('deletes a session', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /delete pair on the payments bug/i })
    );

    expect(screen.queryByText('Pair on the payments bug')).not.toBeInTheDocument();
  });
});
