import { Router } from 'express';
import { httpForgotPassword, httpCreateUser, httpLoginUser, httpResetPassword } from '../controllers/user/auth.controllers.js';
import { httpDeleteUser, httpGetUsers } from '../controllers/user/user.contollers.js';
import { isDirectorOrProducer } from '../middlewares/elevatedRole.js';
import { errorCatcher } from '../middlewares/error.js';
const router = Router();

router.route('/').post(errorCatcher(httpCreateUser)).delete(httpDeleteUser).get(httpGetUsers);
router.route('/login').post(errorCatcher(httpLoginUser));
router.route("/forgotpassword").post(errorCatcher(httpForgotPassword));
router.route("/passwordreset/:resetToken").put(errorCatcher(httpResetPassword));

export default router;