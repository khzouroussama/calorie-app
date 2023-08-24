import React from 'react';
import renderer from 'react-test-renderer';

import { TextField } from './text-field';

describe('<TextField />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TextField value="Hellp" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
