import { HttpException, HttpStatus } from '@nestjs/common';

import { getStorage } from 'firebase-admin/storage';

export const uploadFileToFirebase = async (
  fileToUpload: Express.Multer.File,
  filePath: string,
  type: string,
) => {
  try {
    const bucket = getStorage().bucket();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const timestamp = Date.now();
    const fileName = `${filePath}/${timestamp}-${fileToUpload.originalname}`;
    const fileRef = bucket.file(`${fileName}`);

    // Add additional metadata (optional)
    const metadata = {
      contentType: fileToUpload.mimetype,
      type,
    };

    await fileRef.save(fileToUpload.buffer, { metadata });
    // Return the uploaded file information (including download URL)
    const url = await fileRef.getSignedUrl({
      action: 'read',
      expires: expiryDate,
    });

    return {
      fileName,
      url: url[0],
      metadata, // Include metadata in the response
    };
  } catch (err) {
    throw new HttpException(
      err.message,
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

export const getSignedUrl = async (filePath: string) => {
  try {
    const bucket = getStorage().bucket();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);
    const url = await bucket.file(filePath).getSignedUrl({
      action: 'read',
      expires: expiryDate
    }) 
    return url?.[0] || '';
  }
  catch(err) {
    throw new HttpException(
      err.message,
      err.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}