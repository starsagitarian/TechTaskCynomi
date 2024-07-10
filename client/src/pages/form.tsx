import React from 'react';
import SleepDataForm from '../components/SleepDataForm';
import Image from 'next/image';
import styles from '../styles/form.module.css';  // Ensure correct path
import logo from '../../public/logo.jpg';  // Ensure correct path and public asset handling

const FormPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Image src={logo} alt="Logo" className={styles.logo} />
      <h1 className={styles.title}>Sleep Tracker App</h1>
      <h4 className={styles.subtitle}>Please provide your details below</h4>
      <SleepDataForm onSubmit={(formData) => console.log(formData)} />
    </div>
  );
};

export default FormPage;
