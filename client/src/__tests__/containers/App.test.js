import React from 'react';
import App from '../../Containers/App';

describe('<App />', () => {
  it('should render correctly', () => {
    // Mock axios requests
    mock.onGet('/auth/isLoggedIn').reply(200, true);

    // Spy on IsLoggedIn
    const isLoggedInSpy = jest.spyOn(App.prototype, 'isLoggedIn');
    
    // Shallow render it
    const wrapper = shallow(
      <App/>
    );

    // Compare to old snapshot
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    // Check if component mounting methods were called
    expect(isLoggedInSpy).toHaveBeenCalled();
  });
});

