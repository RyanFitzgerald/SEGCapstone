import React from 'react';
import Note from '../../../Components/projects/Note';

describe('<Note />', () => {
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
  });

  it('should render correctly', () => {   
    // Create mock functions / spies
    const setActiveSubtabMock = jest.fn();
    const renderErrorMock = jest.fn();
    
    // Shallow render it
    const wrapper = shallow(
      <Note setActiveSubtab={setActiveSubtabMock} renderError={renderErrorMock} location={location}/>
    );

    // Compare to old snapshot
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    // Check set active subtab is called and with correct value
    expect(setActiveSubtabMock).toHaveBeenCalledTimes(1);
    expect(setActiveSubtabMock.mock.calls[0][0]).toBe(0);
  });
});

