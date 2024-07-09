import { Request, Response } from 'express';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { UserProfile } from '../models/userProfile';
import { DynamoDBDocumentClient, QueryCommand, QueryCommandInput, GetCommand } from '@aws-sdk/lib-dynamodb';
import { fetchSleepDataForLastSevenDays } from '../services/sleepDataService';

const dbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const dynamoDB = DynamoDBDocumentClient.from(dbClient);

const getUserById = async (req: Request, res: Response) => {

    const userId = req.params.UserId;

    const params = {
        TableName: 'UserProfiles',
        Key: {
            'UserId': userId
        }
    };

    try {
        const data = await dynamoDB.send(new GetCommand(params));
        if (data.Item) {
            res.status(200).json(data.Item);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error: any) {
        console.log('Error!! details are as follows: ', error);
        res.status(500).send(`Failed to collect data: ${error.message}`);
    }
};

const getUserByEmail = async(req: Request, res: Response): Promise<void> => {
    const email = req.params.email.toLowerCase();
    const params: QueryCommandInput = {
        TableName: 'UserProfiles',
        IndexName: 'emailIndex',
        KeyConditionExpression: 'email = :emailVal',
        ExpressionAttributeValues: {
            ':emailVal': email
        },
        Limit: 1
    }

    try {
        const data = await dynamoDB.send(new QueryCommand(params));
        if (data.Items && data.Items.length > 0) {
            const user: UserProfile = data.Items[0] as any as UserProfile;
            console.log('User found: ', user);
            res.status(200).json(user);
        } else {
            res.status(400).send('User not found!');
        }
    } catch (error: any) {
        console.error('Error obtaining user by email: ', error);
        res.status(500).send(`The following error occured: ${error.message}`);
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    const params = {
        TableName: 'UserProfiles'
    };

    try {
        const data = await dynamoDB.send(new ScanCommand(params));
        res.status(200).json(data.Items);
    } catch (error: any) {
        console.log('Error!! details are as follows: ', error);
        res.status(500).send(`Failed to collect data: ${error.message}`);
    }
};

const getRecentSleepData = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const sleepData = await fetchSleepDataForLastSevenDays(userId);
        res.status(200).json(sleepData);
    } catch (error: any) {
        console.log('Error!! details are as follows: ', error);
        res.status(500).send(`Failed to collect data: ${error.message}`);
    }
};

export { getUserById, getAllUsers, getUserByEmail, getRecentSleepData }; 