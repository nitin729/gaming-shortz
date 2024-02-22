import { Injectable, computed, signal } from '@angular/core';
import { Client, Storage, Databases, ID, Models, Query } from 'appwrite';
import { environment } from '../../environments/environment.development';
import { Clip } from '../models/Clip';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  client = new Client();

  storage;
  db;
  clips = signal<Models.Document[]>([]);
  activeClip = signal<Models.Document | null>(null);
  userClips = signal<Models.Document[]>([]); //
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
  constructor(private auth: AuthService) {
    this.client
      .setEndpoint(environment.appwrite.URL)
      .setProject(environment.appwrite.PROJECT_ID); // Replace with your project ID
    this.storage = new Storage(this.client);
    this.db = new Databases(this.client);
  }

  async createClipDocument(clip: Clip) {
    try {
      const document = await this.db.createDocument(
        environment.appwrite.DATABASE_ID,
        environment.appwrite.COLLECTION_ID,
        ID.unique(),
        clip
      );
      return document;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async deleteClipDocument(id: string) {
    try {
      await this.db.deleteDocument(
        environment.appwrite.DATABASE_ID,
        environment.appwrite.COLLECTION_ID,
        id
      );
    } catch (error) {
      console.log(error);
    }
  }
  async getAllClips() {
    try {
      const clips = await this.db.listDocuments(
        environment.appwrite.DATABASE_ID,
        environment.appwrite.COLLECTION_ID
      );
      this.clips.update(() => clips.documents);
      console.log(this.clips);

      //  return this.clips();
    } catch (error) {
      console.log(error);
    }
  }

  async uploadClip(file: File) {
    try {
      const clip = await this.storage.createFile(
        environment.appwrite.BUCKET_ID,
        ID.unique(),
        file
      );
      this.clip.set(clip);
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
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getUserClips(userId: string | null, sortOption: string) {
    try {
      const clips = await this.db.listDocuments(
        environment.appwrite.DATABASE_ID,
        environment.appwrite.COLLECTION_ID,
        [
          Query.equal('userId', [userId || '']),
          sortOption === 'ASCE'
            ? Query.orderAsc('timestamp')
            : Query.orderDesc('timestamp'),
        ]
      );
      this.userClips.update(() => clips.documents);
      return clips.documents;
    } catch (error) {
      console.log(error);
    }
    return null;
  }
  async getFilteredUserClips(userId: string | null) {
    try {
      const clips = await this.db.listDocuments(
        environment.appwrite.DATABASE_ID,
        environment.appwrite.COLLECTION_ID,
        [Query.equal('userId', [userId || ''])]
      );
      this.userClips.update(() => clips.documents);
      return clips.documents;
    } catch (error) {
      console.log(error);
    }
    return null;
  }
  async deleteUserClips(id: string, clipId: string) {
    try {
      await this.db.deleteDocument(
        environment.appwrite.DATABASE_ID,
        environment.appwrite.COLLECTION_ID,
        id
      );
      await this.storage.deleteFile(environment.appwrite.BUCKET_ID, clipId);
      this.userClips.update((prevDocs) => {
        return prevDocs.filter((doc) => doc.$id !== id);
      });
      return this.userClips();
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async updateClipDocument(id: string, title: string) {
    try {
      await this.db.updateDocument(
        environment.appwrite.DATABASE_ID,
        environment.appwrite.COLLECTION_ID,
        id,
        { title: title }
      );
    } catch (error) {}
  }

  /* async createSortzDocument(shortz: Clip) {
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

  getUserClips() {
    const userDocuments = computed(() =>
      this.documents().filter((doc) => {
        return doc['userId'] == this.auth.user()?.$id;
      })
    );
    // this.userClips.update(() => userDocuments());
    // console.log(this.userClips());
    return userDocuments() ? userDocuments() : [];
  }
  async deleteDocuments(id: string) {
    try {
      await this.db.deleteDocument(
        environment.appwrite.DATABASE_ID,
        environment.appwrite.COLLECTION_ID,
        id
      );
      this.documents.update((prevDocs) => {
        return prevDocs.filter((doc) => doc.$id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUserClips(id: string) {
    try {
      await this.deleteDocuments(id);
      await this.storage.deleteFile(environment.appwrite.BUCKET_ID, id);
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
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getAllVideos() {
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
