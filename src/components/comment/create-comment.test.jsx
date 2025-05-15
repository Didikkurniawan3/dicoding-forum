/**
 * test scenarios for CreateComment component
 *
 * - CreateComment component
 *   - should render textarea and button
 *   - should update textarea when user types
 *   - should call createComment with correct value and reset input
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateComment from './create-comment';

describe('CreateComment component', () => {
  it('should render textarea and button', () => {
    render(<CreateComment createComment={() => {}} />);
    expect(screen.getByPlaceholderText(/comment/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument();
  });

  it('should update textarea when user types', () => {
    render(<CreateComment createComment={() => {}} />);
    const textarea = screen.getByPlaceholderText(/comment/i);
    fireEvent.change(textarea, { target: { value: 'Test Comment' } });
    expect(textarea.value).toBe('Test Comment');
  });

  it('should call createComment with correct value and reset input', () => {
    const mockCreateComment = vi.fn();
    render(<CreateComment createComment={mockCreateComment} />);

    const textarea = screen.getByPlaceholderText(/comment/i);
    const button = screen.getByRole('button', { name: /post/i });

    fireEvent.change(textarea, { target: { value: 'New Comment' } });
    fireEvent.click(button);

    expect(mockCreateComment).toHaveBeenCalledWith('New Comment');
    expect(textarea.value).toBe('');
  });
});
