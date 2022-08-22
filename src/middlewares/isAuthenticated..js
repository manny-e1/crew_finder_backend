import jwt from 'jsonwebtoken';
import { getUser } from '../services/user/user.services.js';
import { ErrorResponse } from '../utils/errorResponse.js';

export async function isAuthenticated(req, _, next) {
  let token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (token) {
    try {
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      const currentUser = await getUser(
        {
          _id: id,
        },
        {
          _id: 1,
          fullName: 1,
          email: 1,
          username: 1,
          role: 1,
        }
      );
      req.user = currentUser;
      next();
    } catch (error) {
      throw new ErrorResponse('Not Authenticated', 401);
    }
  } else {
    throw new ErrorResponse('Not Authenticated, no token', 401);
  }
}
