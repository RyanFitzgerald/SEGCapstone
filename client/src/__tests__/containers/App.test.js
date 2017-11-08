import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Import components
import App from '../../Containers/App';

// Setup axios mock
const mock = new MockAdapter(axios);

describe('<App />', () => {
  it('should render correctly', () => {
    mock.onGet('/auth/isLoggedIn').reply(200, true);
    const output = shallow(
      <App/>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});

