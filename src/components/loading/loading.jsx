import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return <LoadingBar updateTime={100} progressIncrease={1} showFastActions />;
}

export default Loading;
