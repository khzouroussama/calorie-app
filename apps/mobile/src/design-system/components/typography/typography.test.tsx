import React from 'react';
import renderer from 'react-test-renderer';

import { Typography } from './typography';

describe('<Typography />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Typography text="Hellp" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
