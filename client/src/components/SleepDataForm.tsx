import React, { useState } from 'react';
import { postUserData, fetchUserData } from '@/services/api';
import { useRouter } from 'next/router';
import styles from '../styles/sleepDataForm.module.css';
import { useSleepData } from '@/contexts/SleepDataContext';

interface FormData {
  name: string;
  email: string;
  gender: string;
  date: string;
  sleepTime: number;
}

interface SleepDataFormProps {
  onSubmit: (data: FormData) => void;
}

const SleepDataForm: React.FC<SleepDataFormProps> = ({ onSubmit }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        gender: '',
        sleepTime: 0,
        date: ''
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const { clearSleepData } = useSleepData();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await postUserData(formData);
            clearSleepData();
            const userData = await fetchUserData(formData.email);
            if (userData) {
                router.push({
                    pathname: '/table',
                    query: { userId: userData.UserId, name: userData.name }
                });
            } else {
                throw new Error('User not found after data submission. Please try again.');
            }
            console.log('Submission successful:', data);
            setFormData({ name: '', email: '', gender: '', date: '', sleepTime: 0 }); // Clear the form
            alert('Data submitted successfully');
        } catch (error: any) {
            console.error('Submission failed:', error);
            setError('Failed to submit data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="font-semibold">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="font-semibold">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="gender" className="font-semibold">Gender:</label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="date" className="font-semibold">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label htmlFor="sleepTime" className="font-semibold">Sleep Time (hours):</label>
                <input
                    type="number"
                    id="sleepTime"
                    name="sleepTime"
                    value={formData.sleepTime}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                />
            </div>
            <button type="submit" disabled={loading} className={styles.submitButton}>
                {loading ? 'Submitting...' : 'Submit'}
            </button>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
    );
};

export default SleepDataForm;