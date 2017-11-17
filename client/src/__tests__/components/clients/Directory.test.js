import React from 'react';
import Directory from '../../../Components/clients/Directory';

describe('<Directory />', () => {
  it('should render correctly', () => {   
    // Create mock functions / spies
    const setActiveSubtabMock = jest.fn();
    const sort = {name:null, email:null, city:null};
    
    // Shallow render it
    const wrapper = shallow(
      <Directory setActiveSubtab={setActiveSubtabMock} sort={sort}/>
    );

    // Compare to old snapshot
    expect(shallowToJson(wrapper)).toMatchSnapshot();

    // Check set active subtab is called and with correct value
    expect(setActiveSubtabMock).toHaveBeenCalledTimes(1);
    expect(setActiveSubtabMock.mock.calls[0][0]).toBe(1);
  });
});

