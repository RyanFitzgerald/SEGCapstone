import { configure, shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { MemoryRouter, Route } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import localStorageMock from './__mocks__/localStorage';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Setup enzyme to use adapter
configure({ adapter: new Adapter() });

// Setup axios mock
const mock = new MockAdapter(axios);
global.mock = mock;

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.shallowToJson = shallowToJson;

// Make localStorage mock global
global.localStorage = localStorageMock;