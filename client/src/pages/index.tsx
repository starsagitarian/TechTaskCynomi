import React, { useState } from 'react';
import Router from 'next/router';

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    date: '',
    sleepTime: 0,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // API call to submit the data
    // On success navigate to the table page
    Router.push('/table');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sleep Tracker App</h1>
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
