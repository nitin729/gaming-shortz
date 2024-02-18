import { Client, Account } from 'appwrite';
import { environment } from '../../environments/environment.development';

export const client = new Client();

client
  .setEndpoint(environment.appwrite.URL)
  .setProject(environment.appwrite.PROJECT_ID); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';
