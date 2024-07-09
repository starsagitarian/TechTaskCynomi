// UserService.ts
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, QueryCommandInput, PutCommand } from '@aws-sdk/lib-dynamodb';
import { UserProfile } from '../models/userProfile';
import { generateUserId } from '../utils/utilityFunctions';
import dotenv from 'dotenv';

dotenv.config();

const dynamoDB = DynamoDBDocumentClient.from(new DynamoDBClient({ 
    region: process.env.AWS_REGION 
}));

const findUserByEmail = async (email: string): Promise<UserProfile | void> => {

    const params: QueryCommandInput = {
        TableName: 'UserProfiles',
        IndexName: 'emailIndex',
        KeyConditionExpression: '#email = :emailVal',
        ExpressionAttributeNames: {
            '#email': 'email'
        },
        ExpressionAttributeValues: {
            ':emailVal': email
        }
    };

    console.log("Query Params:", JSON.stringify(params, null, 2));

    try {
        const data = await dynamoDB.send(new QueryCommand(params));
         console.log(`Raw data from DynamoDB: ${JSON.stringify(data, null, 2)}`);
        
        if (data.Items && data.Items.length > 0) {
            return data.Items[0] as UserProfile;
        } else {
            console.log("User not found with email:", email);
        }
    } catch (error: any) {
        console.error("Error finding user by email: ", error.message);
        throw new Error('Failed to find user by email.');
    }
};

const createUser = async (email: string, name: string, gender: string): Promise<UserProfile | any> => {

    const userId = generateUserId();
    const userProfile: UserProfile = {
        UserId: userId,
        email,
        name,
        gender
    };

    try {
        await dynamoDB.send(new PutCommand({
            TableName: 'UserProfiles',
            Item: userProfile
        }));
        console.log("User profile created successfully with UserID:", userProfile.UserId);
        return userProfile;
    } catch (error: any) {
        console.error("Error creating user profile: ", error.message);
        throw new Error('Failed to create user profile.');
    }
}

export { createUser, findUserByEmail };
