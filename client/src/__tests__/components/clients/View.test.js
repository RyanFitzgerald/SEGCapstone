import React from 'react';
import View from '../../../Components/clients/View';

describe('<View />', () => {
  let location;

  beforeAll(() => {
    // Add necessary info to user
    const user = {
      role: {
        level: 1
      }
    };
    localStorage.setItem('user', JSON.stringify(user));

    // Create location prop with needed data
    location = {
      match: {
        params: {
          id: 1
        }
      }
    };
  });

  it('should render correctly', () => {   
    // Truncated client result
    mock.onAny().reply(200, {
      addedBy: { email: 'admin@example.com', name: 'Admin' },
      city: 'Orleans',
      created: '2017-11-03T03:43:43.671Z',
      email: 'ronaldwalker10@gmail.com',
      firstName: 'Ronald',
      homePhone: '613-834-1202',
      houseNumber: '4220',
      id: '59c846e4aa442d126c3e0ba5',
      lastName: 'Walker',
      location: { coordinates: [-75.697193099999991, 45.4215296] },
      notes: [{
        description: 'Client will be paying the full amount due next week',
        addedBy: { name: 'Admin' },
        created: '2017-09-29T23:29:48.579Z'
      }],
      postalCode: 'K4A5E6',
      projects: [{_id: '59c84accaa442d126c3e0bab', name: 'Walker Windows Project', status: 'Incomplete'}],
      street: 'Innes Road',
      _id: '59c846e4aa442d126c3e0ba5'
    });

    // Create mock functions / spies
    const setActiveSubtabMock = jest.fn();
    const renderErrorMock = jest.fn();
    const getClientSpy = jest.spyOn(View.prototype, 'getClient');
    
    // Shallow render it
    const wrapper = shallow(
      <View setActiveSubtab={setActiveSubtabMock} renderError={renderErrorMock} location={location}/>
    );

    // Compare to old snapshot
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    // Check set active subtab is called and with correct value
    expect(setActiveSubtabMock).toHaveBeenCalledTimes(1);
    expect(setActiveSubtabMock.mock.calls[0][0]).toBe(0);

    // Check if component mounting methods were called
    expect(getClientSpy).toHaveBeenCalled();
  });
});

