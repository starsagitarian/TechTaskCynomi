import React from 'react';
import SleepDataForm from '../components/SleepDataForm'; // Adjust the path as necessary

const FormPage: React.FC = () => {
    return (
        <div>
            <h1>Submit Your Sleep Data</h1>
            <SleepDataForm onSubmit={(data: any) => console.log(data)} />
        </div>
    );
};

export default FormPage;