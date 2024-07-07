import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const configureAWS = () => {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
  };

const dynamoDB = new AWS.DynamoDB();

export { configureAWS, dynamoDB };

