import React from 'react';
import LoadingGif from '../loading.gif';

const Loading = (props) => {
  return (
    <div className="loading">
      <img src={LoadingGif} alt="Loading..."/>
    </div>
  );
};

export default Loading;