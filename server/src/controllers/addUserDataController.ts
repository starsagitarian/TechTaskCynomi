import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../services/userService';
import { addSleepData } from '../services/sleepDataService'; 
import { UserSleepEntry } from '../models/userSleepEntry';
import { generateUserId } from '../utils/utilityFunctions';
import { UserProfile } from '../models/userProfile';


const addUserSleepData = async (req: Request, res: Response): Promise<void> => {
    
    const { email, name, gender, date, sleepTime } = req.body;
    const lowCaseEmail: string = email.toLowerCase();

    try {
        let user = await findUserByEmail(lowCaseEmail) as UserProfile;
        if (!user) {
            user = await createUser(lowCaseEmail, name, gender);
            console.log("New user created:", user);
        }
        console.log(`User found with UserId: ${user.UserId}`);
        const entryId = generateUserId();
        console.log(`Entry ID generated: ${entryId}`);
        const sleepData: UserSleepEntry = {
            UserId: user.UserId,  
            entryId: entryId,
            date: date,
            sleepTime: sleepTime,
        };
        await addSleepData(sleepData);
        res.status(201).send({ 
            message: 'Sleep data added successfully.', 
            user, 
            sleepData
        });
    } catch (error: any) {
        console.error('Error adding sleep data for user:', error);
        res.status(500).send(`The following error occurred: ${error.message}`);
    }
};

export { addUserSleepData };