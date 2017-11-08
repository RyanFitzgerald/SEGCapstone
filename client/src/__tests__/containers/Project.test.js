import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Import components
import Project from '../../Containers/Project';

// Setup axios mock
const mock = new MockAdapter(axios);

describe('<Project />', () => {
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
    const getTypesSpy = jest.spyOn(Project.prototype, 'getTypes');
    const getClientsSpy = jest.spyOn(Project.prototype, 'getClients');
    const getProjectsSpy = jest.spyOn(Project.prototype, 'getProjects');

    // Shallow render it
    const wrapper = shallow(
      <Project setActiveTab={setActiveTabMock}/>
    );

    // Compare to old snapshot
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    // Check set active tab is called and with correct value
    expect(setActiveTabMock).toHaveBeenCalledTimes(1);
    expect(setActiveTabMock.mock.calls[0][0]).toBe(2);

    // Check if component mounting methods were called
    expect(getTypesSpy).toHaveBeenCalled();
    expect(getClientsSpy).toHaveBeenCalled();
    expect(getProjectsSpy).toHaveBeenCalled();
  });
});

