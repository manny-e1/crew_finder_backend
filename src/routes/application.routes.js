import { Router } from 'express';
import { httpCreateApplication, httpDeleteApplication, httpDeleteApplications, httpGetApplication, httpGetApplications, httpGetAuditionPostApplications, httpUpdateApplication } from '../controllers/application/application.controllers.js';
import { errorCatcher } from '../middlewares/error.js';
import { isAuthenticated } from '../middlewares/isAuthenticated..js';
import validateApplicationLetter from '../validation/application/application.validate.js';

const router = Router();

router.route('/')
        .post(
            validateApplicationLetter,
            errorCatcher(isAuthenticated),
            errorCatcher(httpCreateApplication)
        )
        .get(
            errorCatcher(isAuthenticated),
            errorCatcher(httpGetApplications)
        )
        .delete(
            errorCatcher(isAuthenticated),
            errorCatcher(httpDeleteApplications)
        );

router.route('/:id')
        .get(
            errorCatcher(isAuthenticated),
            errorCatcher(httpGetApplication)
        )
        .put(
            errorCatcher(isAuthenticated),
            errorCatcher(httpUpdateApplication)
        )
        .delete(
            errorCatcher(isAuthenticated),
            errorCatcher(httpDeleteApplication)
        );
router.route('/audition/:auditionPostId')
        .get(
            errorCatcher(isAuthenticated),
            errorCatcher(httpGetAuditionPostApplications)
        )

export default router; 