import React from 'react';
import renderer from 'react-test-renderer';

import Box from './box';

describe('<Box />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Box />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
