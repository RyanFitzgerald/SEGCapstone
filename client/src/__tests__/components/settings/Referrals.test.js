import React from 'react';
import Referrals from '../../../Components/settings/Referrals';

describe('<Referrals />', () => {

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
    const getReferralsSpy = jest.spyOn(Referrals.prototype, 'getReferrals');

    // Shallow render it
    const wrapper = shallow(
      <Referrals setActiveSubtab={setActiveSubtabMock} renderError={renderErrorMock}/>
    );

    // Compare to old snapshot
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    // Check set active subtab is called and with correct value
    expect(getReferralsSpy).toHaveBeenCalledTimes(1);
    expect(setActiveSubtabMock).toHaveBeenCalledTimes(1);
    expect(setActiveSubtabMock.mock.calls[0][0]).toBe(4);
  });
});
