import React from 'react';
import renderer from 'react-test-renderer';

import { DateTimeField } from './date-time-field';

Date.now = jest.fn(() => new Date(Date.UTC(2023, 1, 14)).valueOf());

describe('<Card />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<DateTimeField value={new Date(Date.now())} mode="datetime" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
