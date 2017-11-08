import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sessionStorageMock from './__mocks__/sessionStorage';

// Setup enzyme to use adapter
configure({ adapter: new Adapter() });

global.sessionStorage = sessionStorageMock;