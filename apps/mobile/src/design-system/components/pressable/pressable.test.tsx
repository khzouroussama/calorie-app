import React from 'react';
import renderer from 'react-test-renderer';

import { Pressable } from './pressable';

describe('<Typography />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Pressable />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
