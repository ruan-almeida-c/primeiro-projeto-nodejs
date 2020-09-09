import crypto from 'crypto';
import path from 'path';
import multer from 'multer';

const pathFile = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: pathFile,
  storage: multer.diskStorage({
    destination: pathFile,
    filename(request, file, callback) {
      const filehash = crypto.randomBytes(10).toString('hex');
      const fileName = `${filehash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
