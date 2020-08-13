import React from 'react';
import { render } from '@testing-library/react';
import Button from '../../components/Button';

describe('Button component', () => {
  it('should be able to render a button', () => {
    const { getByText } = render(<Button>teste</Button>);

    expect(getByText('teste')).toBeTruthy();
  });

  it('should be show a button with state of loading', () => {
    const { getByText } = render(<Button loading>teste</Button>);

    expect(getByText('Carregando...')).toBeTruthy();
  });
});
