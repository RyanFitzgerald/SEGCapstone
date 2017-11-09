import React from 'react';
import Home from '../../Components/Home';

describe('<Home />', () => {
  it('should render correctly', () => {
    // Create mock functions / spies
    const setActiveTabMock = jest.fn();

    // Shallow render it
    const wrapper = shallow(
      <Home setActiveTab={setActiveTabMock}/>
    );

    // Compare to old snapshot
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    // Check set active tab is called and with correct value
    expect(setActiveTabMock).toHaveBeenCalledTimes(1);
    expect(setActiveTabMock.mock.calls[0][0]).toBe(1);
  });
});
