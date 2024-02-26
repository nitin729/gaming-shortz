import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { ID } from 'appwrite';
import { randomUUID } from 'crypto';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  isReady = false;
  isRunning = false;
  private ffmpeg;
  constructor() {
    this.ffmpeg = createFFmpeg({
      log: true,
    });
  }

  async init() {
    if (this.isReady) {
      return;
    }

    await this.ffmpeg.load();
    this.isReady = true;
  }

  async getScreenshots(file: File) {
    //convert the file into binary data
    this.isRunning = true;
    const data = await fetchFile(file);
    console.log(data);
    this.ffmpeg.FS('writeFile', file.name, data);

    const seconds = [1, 3, 5];
    const commands: string[] = [];
    seconds.forEach((second) => {
      commands.push(
        //Input
        '-i',
        file.name,
        //Output options
        '-ss',
        `00:00:0${second}`,
        '-frames:v',
        '1',
        '-filter:v',
        'scale=510:-1',
        //Output
        `output_0${second}.png`
      );
    });

    await this.ffmpeg.run(...commands);

    const screenshots: string[] = [];
    seconds.forEach((second) => {
      const screenshotFile = this.ffmpeg.FS(
        'readFile',
        `output_0${second}.png`
      );
      console.log(
        this.ffmpeg.FS('writeFile', `output_0${second}.png`, screenshotFile),
        'Files'
      );

      const screenshotBlob = new Blob([screenshotFile.buffer], {
        type: 'image/png',
      });
      const screenshotUrl = URL.createObjectURL(screenshotBlob);
      screenshots.push(screenshotUrl);
    });
    this.isRunning = false;
    return screenshots;
  }

  async getScreenshot(url: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    console.log(url, 'url');

    console.log(blob, 'blob');
    console.log(`output ${ID.unique()}`);

    return this.blobToFile(blob, `output ${Math.random() * 100 + 1}`);

    // return blob;
  }
  blobToFile(theBlob: Blob, fileName: string): File {
    const b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;
    const file = new File([b], fileName, {
      type: b.type,
    });
    //Cast to a File() type
    return file as File;
  }
}
