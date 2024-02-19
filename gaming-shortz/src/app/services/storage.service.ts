import { Injectable } from '@angular/core';
import { Client, Storage, ID } from 'appwrite';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(environment.appwrite.URL)
      .setProject(environment.appwrite.PROJECT_ID); // Replace with your project ID
    this.storage = new Storage(this.client);
  }

  async createFile(file: File) {
    await this.storage.createFile(
      environment.appwrite.BUCKET_ID,
      ID.unique(),
      file
      /* (progress: string[]) => {
        console.log(progress);
      } */
    );
  }
}
