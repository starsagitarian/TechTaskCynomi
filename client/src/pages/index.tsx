import React, { useState } from 'react';
import Router from 'next/router';
import Image from 'next/image';
import logo from '../../public/logo.jpg';
import divider from '../../public/divider.png';
import styles from '../styles/index.module.css';

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
    Router.push('/form');
  };

  return (
    <div className={styles.container}>
      <Image src={divider} alt="Divider" className={styles.dividerUp} />
      <Image src={logo} alt="Logo" className={styles.logo}/>
      <Image src={divider} alt="Divider" className={styles.dividerDown} />
      <h1 className={styles.title}>Cynomi tech task</h1>
      <h2 className={styles.label}>Sleep Tracker App</h2>
      <p className={styles.description}>Submitted by: <strong>Baiju Joseph</strong>
      </p>

        <button type="submit" className={styles.submitButton} onClick={handleSubmit}>Push in your sleep details</button>

    </div>
  );
};

export default Home;
