import { Router, Request, Response, json } from 'express';
import multer from 'multer';
import UploadConfig from '../config/avatar';
import CreateUserService from '../services/CreateUserService';
import EnsureAthenticated from '../middlewares/ensureAuthentication';
import UpdateUserService from '../services/UpdateUserService';

const upload = multer(UploadConfig);
const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  try {
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  EnsureAthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const avatar = new UpdateUserService();

    const user = await avatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
