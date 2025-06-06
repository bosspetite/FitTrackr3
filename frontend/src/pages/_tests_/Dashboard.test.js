import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';

describe('Dashboard', () => {
  beforeEach(() => {
    // Simulate a logged-in user
    localStorage.setItem('token', 'testtoken');
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('renders Dashboard content', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Welcome to Your Fitness Dashboard/i)).toBeInTheDocument();
  });
});