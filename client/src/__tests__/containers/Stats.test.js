import React from 'react';
import Stats from '../../Containers/Stats';

describe('<Stats />', () => {
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
    // Return empty objects on requests
    mock.onAny().reply(200, {});

    // Create mock functions / spies
    const setActiveTabMock = jest.fn();
   
    // Shallow render it
    const wrapper = shallow(
      <Stats setActiveTab={setActiveTabMock}/>
    );

    // Compare to old snapshot
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    // Check set active tab is called and with correct value
    expect(setActiveTabMock).toHaveBeenCalledTimes(1);
    expect(setActiveTabMock.mock.calls[0][0]).toBe(4);
  });
});

