import { v4 as uuidv4 } from 'uuid';

const generateUserId = (): string => {
    return uuidv4();
}

export { generateUserId };