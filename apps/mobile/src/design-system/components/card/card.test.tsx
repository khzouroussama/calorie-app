import React from 'react';
import renderer from 'react-test-renderer';

import { Card } from './card';
import { Typography } from '../typography';

describe('<Card />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Card>
          <Typography>Test</Typography>
        </Card>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
