import React from 'react';
import Header from '../../Components/Header';

describe('<Header />', () => {
  beforeAll(() => {
    // Add necessary info to user
    const user = {
      name: 'John',
      role: {
        level: 1
      }
    };
    sessionStorage.setItem('user', JSON.stringify(user));
  });

  it('should render correctly', () => {
    // Shallow render it
    const wrapper = shallow(
      <Header/>
    );

    // Compare to old snapshot
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    // Ensure username is in header
    expect(wrapper.find('.header__usertoggle').prop('children')).toContain('John');
  });
});
