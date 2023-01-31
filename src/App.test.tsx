import { describe, expect, test } from '@jest/globals';
import { render } from '@testing-library/react';
import { App } from './App';

const sum = (a: number, b: number) => a + b;

describe('App', () => {
  test('has the correct heading text', () => {
    const { getByRole } = render(<App />);
    expect(getByRole('heading').textContent).toBe('Seek | Luke Howard');
  });
});
