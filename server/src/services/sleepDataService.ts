import { AttributeValue, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, QueryCommandInput, PutCommand } from '@aws-sdk/lib-dynamodb';
import { UserSleepEntry } from '../models/userSleepEntry';
import dotenv from 'dotenv';

dotenv.config();

const dbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const dynamoDB = DynamoDBDocumentClient.from(dbClient);

async function addSleepData(sleepData: UserSleepEntry): Promise<void> {
    const params = {
        TableName: 'UserSleepEntry',
        Item: {
            ...sleepData,
            UserId: sleepData.UserId
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
    const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));

    const params: QueryCommandInput = {
        TableName: 'UserSleepEntry',
        KeyConditionExpression: 'UserId = :userId AND #date >= :sevenDaysAgo',
        ExpressionAttributeNames: { '#date': 'date' },
        ExpressionAttributeValues: {
            ':userId': userId,
            ':sevenDaysAgo': sevenDaysAgo.toISOString().split('T')[0] as unknown as AttributeValue
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
