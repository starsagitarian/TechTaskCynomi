import React from 'react';
import Router from 'next/router';

const TablePage: React.FC = () => {
  const handleRowClick = () => {
    Router.push('/chart');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sleep Records for User: Name</h1>
      {/* Table Implementation */}
      <button onClick={() => Router.push('/')}>Back</button>
    </div>
  );
};

export default TablePage;
