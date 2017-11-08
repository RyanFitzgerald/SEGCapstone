import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Import components
import Client from '../../Containers/Client';

// Setup axios mock
const mock = new MockAdapter(axios);

describe('<Client />', () => {
  beforeAll(() => {
    // Add necessary info to user
    const user = {
      role: {
        level: 1
      }
    };
    sessionStorage.setItem('user', JSON.stringify(user));
  });

  it('should render correctly', () => {
    // Return empty objects on requests
    mock.onAny().reply(200, {});

    // Create mock functions / spies
    const setActiveTabMock = jest.fn();
    const getClientsSpy = jest.spyOn(Client.prototype, 'getClients');

    // Shallow render it
    const wrapper = shallow(
      <Client setActiveTab={setActiveTabMock}/>
    );

    // Compare to old snapshot
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    // Check set active tab is called and with correct value
    expect(setActiveTabMock).toHaveBeenCalledTimes(1);
    expect(setActiveTabMock.mock.calls[0][0]).toBe(3);

    // Check if component mounting methods were called
    expect(getClientsSpy).toHaveBeenCalled();
  });
});

