import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Client, Account, ID } from 'appwrite';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  client = new Client();
  account;
  isLoggedIn = false;
  constructor() {
    this.client
      .setEndpoint(environment.appwrite.URL)
      .setProject(environment.appwrite.PROJECT_ID); // Replace with your project ID
    this.account = new Account(this.client);
  }

  async createAccount(email: string, password: string, name: string) {
    try {
      await this.account.create(ID.unique(), email, password, name);
      this.login(email, password);
      console.log(await this.account.get());
    } catch (error) {
      console.error(error);
    }
  }

  async login(email: string, password: string) {
    try {
      await this.account.createEmailSession(email, password);
      this.isLoggedIn = true;
    } catch (error) {
      console.error(error);
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async logout() {
    try {
      this.isLoggedIn = false;
      return await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}
