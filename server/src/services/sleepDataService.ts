import { AttributeValue, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, QueryCommandInput, PutCommand } from '@aws-sdk/lib-dynamodb';
import { UserSleepEntry } from '../models/userSleepEntry';
import dotenv from 'dotenv';

dotenv.config();

const dbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const dynamoDB = DynamoDBDocumentClient.from(dbClient);

async function addSleepData(sleepData: UserSleepEntry): Promise<void> {

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset the time to start of the day

    // *** Check if the date of the sleep data is in the future ***
    if (new Date(sleepData.date) > today) {
        throw new Error("Cannot add sleep data for future dates.");
    }

    const params = {
        TableName: 'UserSleepEntry',
        Item: {
            ...sleepData,
            UserId: sleepData.UserId,
            date: sleepData.date
        },
    };

    try {
        await dynamoDB.send(new PutCommand(params));
        console.log("Sleep data added successfully.");
    } catch (error: any) {
        console.error("Error adding sleep data: ", error.message);
        throw new Error('Failed to add sleep data.');
    }
}

const fetchSleepDataForLastSevenDays = async (userId: string): Promise<UserSleepEntry[]> => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset the time to start of the day
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const params: QueryCommandInput = {
        TableName: 'UserSleepEntry',
        KeyConditionExpression: 'UserId = :userId AND #date BETWEEN :sevenDaysAgo AND :today',
        ExpressionAttributeNames: { '#date': 'date' },
        ExpressionAttributeValues: {
            ':userId': userId,
            ':sevenDaysAgo': sevenDaysAgo.toISOString().split('T')[0],
            ':today': today.toISOString().split('T')[0]
        },
        ConsistentRead: true,
        ScanIndexForward: false
    };
    try {
        const data = await dynamoDB.send(new QueryCommand(params));
        if (data.Items) {
            return data.Items as UserSleepEntry[];
        }
    } catch (error: any) {
        console.error("Error fetching sleep data for the last 7 days: ", error.message);
        throw new Error(`Error fetching sleep data: ${error.message}`);
    }

    return [];
};

export { addSleepData, fetchSleepDataForLastSevenDays };
