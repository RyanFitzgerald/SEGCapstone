import React from 'react';
import Filter from '../../../Components/stats/Filter';

describe('<Filter />', () => {

  beforeAll(() => {
    // Add necessary info to user
    const user = {
      role: {
        level: 1
      }
    };
    localStorage.setItem('user', JSON.stringify(user));

  });

  it('should render correctly', () => {
    // Return empty array on requests
    mock.onAny().reply(200, []);
    // Create mock functions / spies
    const resetFilterMock = jest.fn();
    const handleFilterMock = jest.fn();

    // Shallow render it
    const wrapper = shallow(
      <Filter resetFilter={resetFilterMock} handleFilter={handleFilterMock}/>
    );

    // Compare to old snapshot
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
