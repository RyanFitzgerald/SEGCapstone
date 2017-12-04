import React from 'react';
import Settings from '../../Containers/Settings';

describe('<Settings />', () => {
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
    const getUsersSpy = jest.spyOn(Settings.prototype, 'getUsers');
    const getRolesSpy = jest.spyOn(Settings.prototype, 'getRoles');

    // Shallow render it
    const wrapper = shallow(
      <Settings setActiveTab={setActiveTabMock}/>
    );

    // Compare to old snapshot
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    // Check set active tab is called and with correct value
    expect(setActiveTabMock).toHaveBeenCalledTimes(1);
    expect(setActiveTabMock.mock.calls[0][0]).toBe(5);

    // Check if component mounting methods were called
    expect(getUsersSpy).toHaveBeenCalled();
    expect(getRolesSpy).toHaveBeenCalled();
  });
});

