import React from 'react';
import View from '../../../Components/users/View';

describe('<View />', () => {
  let location;
  
  beforeAll(() => {
    // Create location prop with needed data
    location = {
      match: {
        params: {
          id: 1
        }
      }
    };

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
    const setActiveSubtabMock = jest.fn();
    const renderErrorMock = jest.fn();
    const getUserSpy = jest.spyOn(View.prototype, 'getUser');

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
    expect(getUserSpy).toHaveBeenCalled();
  });
});