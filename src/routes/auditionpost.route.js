import { Router } from 'express';
import { httpCreateAuditionPost, httpDeleteAuditionPost, httpDeleteAuditionPosts, httpGetAuditionPost, httpGetAuditionPosts, httpUpdateAuditionPost } from '../controllers/auditionPost/auditionpost.controllers.js';
import { errorCatcher } from '../middlewares/error.js';
import { isAuthenticated } from '../middlewares/isAuthenticated..js';
import validateAuditionPost from '../validation/auditionPost/auditionPost.validate.js';
const router = Router();

router.route('/')
        .post(
            validateAuditionPost,
            errorCatcher(isAuthenticated),
            errorCatcher(httpCreateAuditionPost)
        )
        .get(
            errorCatcher(isAuthenticated),
            errorCatcher(httpGetAuditionPosts)
        )
        .delete(
            errorCatcher(isAuthenticated),
            errorCatcher(httpDeleteAuditionPosts)
        );

router.route('/:id')
        .get(
            errorCatcher(isAuthenticated),
            errorCatcher(httpGetAuditionPost)
        )
        .put(
            errorCatcher(isAuthenticated),
            errorCatcher(httpUpdateAuditionPost)
        )
        .delete(
            errorCatcher(isAuthenticated),
            errorCatcher(httpDeleteAuditionPost)
        );

export default router; 