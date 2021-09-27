import { Router } from 'express';
import {
  httpForgotPassword,
  httpCreateUser,
  httpLoginUser,
  httpResetPassword,
  httpConfirmEmail,
} from '../controllers/user/auth.controllers.js';
import {
  httpDeleteUser,
  httpGetUser,
  httpDeleteUsers,
  httpGetUsers,
  httpUpdateSelf,
  httpGetAllUsers,
} from '../controllers/user/user.contollers.js';
import { isAdmin, isDirectorOrProducer } from '../middlewares/elevatedRole.js';
import { errorCatcher } from '../middlewares/error.js';
import { isAuthenticated } from '../middlewares/isAuthenticated..js';
import upload from '../utils/uploadImage.js';
import validateUser from '../validation/user/user.validate.js';
const router = Router();

router
  .route('/')
  .post(validateUser, errorCatcher(httpCreateUser))
  .get(httpGetUsers)
  .delete(errorCatcher(httpDeleteUsers));
router
  .route('/all')
  .get(
    errorCatcher(isAuthenticated),
    errorCatcher(isAdmin),
    errorCatcher(httpGetAllUsers)
  );
router
  .route('/update')
  .put(
    errorCatcher(upload.single('avatar')),
    errorCatcher(isAuthenticated),
    errorCatcher(httpUpdateSelf)
  );
router.route('/login').post(errorCatcher(httpLoginUser));
router.route('/forgotpassword').post(errorCatcher(httpForgotPassword));
router.route('/passwordreset/:resetToken').put(errorCatcher(httpResetPassword));
router
  .route('/confirm-email/:confirmToken')
  .put(errorCatcher(httpConfirmEmail));
// router.route('/search').post(errorCatcher(getMatchingUsers));
router
  .route('/:id')
  .get(errorCatcher(httpGetUser))
  .delete(errorCatcher(httpDeleteUser));

export default router;
