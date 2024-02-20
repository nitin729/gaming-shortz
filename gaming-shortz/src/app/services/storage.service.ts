import { Injectable, signal } from '@angular/core';
import { Client, Storage, Databases, ID, Models, Query } from 'appwrite';
import { environment } from '../../environments/environment.development';
import { Clip } from '../models/Clip';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  client = new Client();

  storage;
  db;
  documents = signal<Models.Document[]>([]);
  clips = signal<Models.File[]>([]);
  clipId = signal('');
  clip = signal<Models.File>({
    $id: '',
    bucketId: '',
    $createdAt: '',
    $updatedAt: '',
    $permissions: [],
    name: '',
    signature: '',
    mimeType: '',
    sizeOriginal: 0,
    chunksTotal: 0,
    chunksUploaded: 0,
  });
  docId = signal('');
  constructor() {
    this.client
      .setEndpoint(environment.appwrite.URL)
      .setProject(environment.appwrite.PROJECT_ID); // Replace with your project ID
    this.storage = new Storage(this.client);
    this.db = new Databases(this.client);
  }

  async createSortzDocument(shortz: Clip) {
    try {
      const document = await this.db.createDocument(
        environment.appwrite.DATABASE_ID,
        environment.appwrite.COLLECTION_ID,
        ID.unique(),
        shortz
      );
      this.docId.set(document.$id);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllDocuments() {
    try {
      const documents = await this.db.listDocuments(
        environment.appwrite.DATABASE_ID,
        environment.appwrite.COLLECTION_ID
      );
      console.log(documents);

      this.documents.update(() => documents.documents);
    } catch (error) {
      console.log(error);
    }
  }

  async createFile(file: File) {
    try {
      const clip = await this.storage.createFile(
        environment.appwrite.BUCKET_ID,
        ID.unique(),
        file
        /* (progress: string[]) => {
          console.log(progress);
        } */
      );
      this.clip.set(clip);
      this.clipId.set(clip.$id);
    } catch (error) {
      console.log(error);
    }
  }

  getFileView(fileId: string) {
    try {
      const clip = this.storage.getFileView(
        environment.appwrite.BUCKET_ID,
        fileId
      );
      return clip.href.toString();
      console.log(clip);
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  /* async getAllVideos() {
    try {
      const allClips = await this.storage.listFiles(
        environment.appwrite.BUCKET_ID
      );
      this.clips.update((prevClips) => allClips.files);
      console.log(this.clips());
    } catch (error) {
      console.log(error);
    }
    return null;
  } */
}
