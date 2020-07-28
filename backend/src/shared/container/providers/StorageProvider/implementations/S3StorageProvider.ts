import fs from 'fs';
import path from 'path';
import mine from 'mine';
import uploadConfig from '@config/upload';
import aws, { S3 } from 'aws-sdk';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);
    const ContentType = mine.getType(originalPath);
    if (!ContentType) {
      throw new Error('File not found');
    }
    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: 'app-gobarber',
        Key: file,
      })
      .promise();
  }
}

export default DiskStorageProvider;
