import { Router } from "express";
import { httpEndorseUser, httpGetAllEndorsements, httpGetEndorsementById, httpGetGivenEndorsements, httpGetReceivedEndorsements } from "../controllers/endorsement/endorsement.controllers";
import { isAdmin, isDirectorOrProducer } from "../middlewares/elevatedRole";
import { errorCatcher } from "../middlewares/error";
import { isAuthenticated } from "../middlewares/isAuthenticated.";

const router = Router();

router
  .route('/')
  .post(
    errorCatcher(isAuthenticated),
    errorCatcher(isDirectorOrProducer),
    errorCatcher(httpEndorseUser)
  )
  .get(
    errorCatcher(isAuthenticated),
    errorCatcher(isAdmin),
    errorCatcher(httpGetAllEndorsements)
  );
router
  .route('/:id')
  .get(
    errorCatcher(isAuthenticated),
    errorCatcher(httpGetEndorsementById)
  );
router
  .route('/given')
  .get(
    errorCatcher(isAuthenticated),
    errorCatcher(isDirectorOrProducer),
    errorCatcher(httpGetGivenEndorsements)
  );
router
  .route('/received')
  .get(
    errorCatcher(isAuthenticated),
    errorCatcher(httpGetReceivedEndorsements)
  );

export default router;