import { Router } from 'express';
import { addUserSleepData } from '../controllers/addUserDataController';
import { getUserById, getAllUsers, getUserByEmail, getRecentSleepData } from '../controllers/readUserDataController';

const router: Router = Router();

router.post('/user-data', addUserSleepData); // Route to add user data
router.get('/users/:UserId', getUserById); // Route to get a user by ID
router.get('/users', getAllUsers);         // Route to get all users
router.get('/user/email/:email', getUserByEmail);  // Route to get a user by email using the newly implemented getUserByEmail function
router.get('/user/:userId/sleep-data/recent', getRecentSleepData); // Route to fetch recent sleep data for a user by userId


export default router;