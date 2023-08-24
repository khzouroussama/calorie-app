import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({ region: process.env.REGION });
const BUCKET_NAME = `calorie-app-bucket-${process.env.STAGE || 'dev'}`;

export const uploadFoodEntryPhoto = async (file: any) => {
  if (!file?.base64) return undefined;
  const photoKey = `food-entry-photos/${Date.now()}-${file?.name}`;

  if (file) {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Body: Buffer.from(file?.base64, 'base64'),
        Key: photoKey,
      }),
    );
  }

  return {
    key: photoKey,
    filename: file?.name,
  };
};

export const getFoodEntrySignedUrl = async (photoKey?: string) => {
  if (!photoKey) return null;
  return getSignedUrl(
    s3Client,
    new GetObjectCommand({ Bucket: BUCKET_NAME, Key: photoKey }),
    { expiresIn: 3600 },
  );
};
