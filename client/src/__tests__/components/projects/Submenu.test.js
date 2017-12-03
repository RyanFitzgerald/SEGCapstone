import React from 'react';
import Submenu from '../../../Components/projects/Submenu';

describe('<Submenu />', () => {
  beforeAll(() => {
    // Add necessary info to user
    const user = {
      role: {
        level: 1
      }
    };
    localStorage.setItem('user', JSON.stringify(user));
  });

  it('should render correctly', () => {   
    // Shallow render it
    const wrapper = shallow(
      <Submenu/>
    );

    // Compare to old snapshot
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    // Check that levels hide elements correctly
    expect(wrapper.find('li')).toHaveLength(1);
  });
});

