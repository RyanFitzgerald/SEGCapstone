import React from 'react';
import PikadayWrapper from '../PikadayWrapper';


const Filter = (props) => {
  let startDate, endDate, postalCode;

  function handleFilter() {
    // Send fields
    props.handleFilter(startDate, endDate, postalCode);
  }

  function resetFilter() {
    startDate.field.value = '';
    endDate.field.value = '';
    postalCode.value = '';

    // Call specific prop function
    props.resetFilter();
  }

  return (
    <div className="row">
      <div className="column">
        <h2 className="card-title">Filter Data</h2>
        <div className="card">
          <div className="row">
            <div className="sm-4 column">
              <label className="form-label" htmlFor="month">Start Date</label>
              <PikadayWrapper name="start-date" ref={input => startDate = input} id="start-date" onSelect={handleFilter} />
            </div>
            <div className="sm-4 column">
              <label className="form-label" htmlFor="year">End Date</label>
              <PikadayWrapper name="end-date" ref={input => endDate = input} id="end-date" onSelect={handleFilter} />
            </div>
            <div className="sm-4 column">
              <label className="form-label" htmlFor="postalCode">Postal Code</label>
              <input ref={input => postalCode = input} id="postalCode" name="postalCode" className="form-text" type="text" onKeyUp={handleFilter}/>
            </div>
          </div>
          <button className="advanced__toggle" id="advanced-toggle" onClick={resetFilter}>Reset Filter</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;