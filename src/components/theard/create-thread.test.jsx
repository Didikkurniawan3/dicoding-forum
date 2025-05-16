/**
 * test scenarios for CreateThread component
 *
 * - CreateThread component
 *   - should render title, category, body inputs and post button
 *   - should update state when inputs change
 *   - should call createThread function with title, category, and body when post button is clicked
 */

import { render, screen, fireEvent } from '@testing-library/react';
import CreateThread from './create-thead';

describe('CreateThread component', () => {
  test('should render title, category, body inputs and post button', () => {
    render(<CreateThread createThread={() => {}} />);

    expect(screen.getByPlaceholderText(/enter thread title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter category/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter thread content/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument();
  });

  test('should update state when inputs change', () => {
    render(<CreateThread createThread={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText(/enter thread title/i), {
      target: { value: 'New Thread Title' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter category/i), {
      target: { value: 'General' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter thread content/i), {
      target: { value: 'This is the content of the new thread' },
    });

    expect(screen.getByPlaceholderText(/enter thread title/i).value).toBe('New Thread Title');
    expect(screen.getByPlaceholderText(/enter category/i).value).toBe('General');
    expect(screen.getByPlaceholderText(/enter thread content/i).value).toBe('This is the content of the new thread');
  });

  test('should call createThread function with title, category, and body when post button is clicked', () => {
    const createThreadMock = vi.fn();
    render(<CreateThread createThread={createThreadMock} />);

    fireEvent.change(screen.getByPlaceholderText(/enter thread title/i), {
      target: { value: 'New Thread Title' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter category/i), {
      target: { value: 'General' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter thread content/i), {
      target: { value: 'This is the content of the new thread' },
    });

    fireEvent.click(screen.getByRole('button', { name: /post/i }));

    expect(createThreadMock).toHaveBeenCalledWith({
      title: 'New Thread Title',
      category: 'General',
      body: 'This is the content of the new thread',
    });
  });
});
