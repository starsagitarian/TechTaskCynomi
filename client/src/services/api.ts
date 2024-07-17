import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3054/api',
});

interface FormData {
  name: string;
  email: string;
  gender: string;
  date: string;
  sleepTime: number;
}

const postUserData = async (formData: FormData) => {
const response = await fetch(`http://localhost:3054/api/user-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    throw new Error('Failed to submit data');
  }
  return response.json();
}

const fetchUserData = async (email: string) => {
  try {
    const response = await api.get(`/user/email/${email}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};

const fetchSleepDataForLastSevenDays = async (userId: string) => {
  try {
    const response = await api.get(`/user/${userId}/sleep-data/recent`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch sleep data');
  }
};

export { postUserData, fetchUserData, fetchSleepDataForLastSevenDays};