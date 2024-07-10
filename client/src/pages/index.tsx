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
    Router.push('/form');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Cynomi tech task</h1>
      <h4>*=======================*</h4>
      <h2>Sleep Tracker App</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <button type="submit">Push in your sleep details</button>
      </form>
    </div>
  );
};

export default Home;
