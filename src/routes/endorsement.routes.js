import { Router } from 'express';
import {
  httpDeleteEndorsement,
  httpDeleteEndorsements,
  httpEndorseUser,
  httpGetAllEndorsements,
  httpGetEndorsementById,
  httpGetGivenEndorsements,
  httpGetReceivedEndorsements,
} from '../controllers/endorsement/endorsement.controllers.js';
import { isAdmin, isDirectorOrProducer } from '../middlewares/elevatedRole.js';
import { errorCatcher } from '../middlewares/error.js';
import { isAuthenticated } from '../middlewares/isAuthenticated..js';

const router = Router();

router
  .route('/')
  .post(
    errorCatcher(isAuthenticated),
    errorCatcher(isDirectorOrProducer),
    errorCatcher(httpEndorseUser)
  )
  .get(errorCatcher(isAuthenticated), errorCatcher(httpGetAllEndorsements))
  .delete(errorCatcher(httpDeleteEndorsements));
router
  .route('/given')
  .get(
    errorCatcher(isAuthenticated),
    errorCatcher(isDirectorOrProducer),
    errorCatcher(httpGetGivenEndorsements)
  );
router
  .route('/received/:endorseeId')
  .get(
    errorCatcher(isAuthenticated),
    errorCatcher(httpGetReceivedEndorsements)
  );
router
  .route('/:id')
  .get(errorCatcher(isAuthenticated), errorCatcher(httpGetEndorsementById))
  .delete(errorCatcher(isAuthenticated), errorCatcher(httpDeleteEndorsement));

export default router;
