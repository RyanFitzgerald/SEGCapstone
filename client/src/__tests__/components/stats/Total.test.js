import React from 'react';
import Total from '../../../Components/stats/Total';

describe('<Total />', () => {

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
    // Return empty array on requests
    mock.onAny().reply(200, []);
    // Create mock functions / spies
    const setActiveSubtabMock = jest.fn();
    const renderErrorMock = jest.fn();
    const getTotalVolumeSpy = jest.spyOn(Total.prototype, 'getTotalVolume');

    // Shallow render it
    const wrapper = shallow(
      <Total setActiveSubtab={setActiveSubtabMock} renderError={renderErrorMock}/>
    );

    // Compare to old snapshot
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    // Check set active subtab is called and with correct value
    expect(getTotalVolumeSpy).toHaveBeenCalledTimes(1);
    expect(setActiveSubtabMock).toHaveBeenCalledTimes(1);
    expect(setActiveSubtabMock.mock.calls[0][0]).toBe(1);
  });
});
