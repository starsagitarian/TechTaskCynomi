import React from 'react';
import SleepDataForm from '../components/SleepDataForm';
import styles from '../styles/form.module.css';

const FormPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Sleep Tracker App</h1>
      <h4>Please provide your details below</h4>
      <SleepDataForm onSubmit={(formData) => console.log(formData)} />
    </div>
  );
};

export default FormPage;