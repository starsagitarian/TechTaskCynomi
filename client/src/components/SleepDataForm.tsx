
import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  gender: string;
  date: string;
  sleepTime: number;
}

interface SleepDataFormProps {
  onSubmit: (data: FormData) => void; // Define the type of the onSubmit function
}

const SleepDataForm: React.FC<SleepDataFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        gender: '',
        sleepTime: 0,
        date: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData); // Call the onSubmit prop passed to the component
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* form inputs here */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default SleepDataForm;
