import React from 'react';
import SleepDataForm from '../components/SleepDataForm'; // Adjust the path as necessary

const FormPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sleep Tracker App</h1>
      <h4>Please provide your details below</h4>
      <SleepDataForm onSubmit={(formData) => console.log(formData)} />
    </div>
  );
};

export default FormPage;