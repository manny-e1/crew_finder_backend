import { Router } from 'express';
import {
  httpDeleteReport,
  httpGetReportById,
  httpGetReports,
  httpReportUser,
} from '../controllers/report/report.controllers.js';
import { isAdmin, isDirectorOrProducer } from '../middlewares/elevatedRole.js';
import { errorCatcher } from '../middlewares/error.js';
import { isAuthenticated } from '../middlewares/isAuthenticated..js';
const router = Router();

router
  .route('/')
  .post(errorCatcher(isAuthenticated), errorCatcher(httpReportUser))
  .get(
    errorCatcher(isAuthenticated),
    errorCatcher(isAdmin),
    errorCatcher(httpGetReports)
  );
router
  .route('/:id')
  .get(
    errorCatcher(isAuthenticated),
    errorCatcher(isAdmin),
    errorCatcher(httpGetReportById)
  )
  .delete(
    errorCatcher(isAuthenticated),
    errorCatcher(isAdmin),
    errorCatcher(httpDeleteReport)
  );
export default router;
