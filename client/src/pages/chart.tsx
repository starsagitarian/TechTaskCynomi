import React from 'react';
import Router from 'next/router';

const ChartPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Weekly Sleep Chart</h1>
      {/* Chart Implementation */}
      <button onClick={() => Router.push('/table')}>Back</button>
    </div>
  );
};

export default ChartPage;
