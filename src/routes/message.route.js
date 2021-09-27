import { Router } from 'express';
import {
  httpRetrieveMessages,
  httpSendMessage,
} from '../controllers/message/message.controllers.js';
import { errorCatcher } from '../middlewares/error.js';
import { isAuthenticated } from '../middlewares/isAuthenticated..js';

const router = Router();

router
  .route('/')
  .post(errorCatcher(isAuthenticated), errorCatcher(httpSendMessage));
router
  .route('/:conversationId')
  .get(errorCatcher(isAuthenticated), errorCatcher(httpRetrieveMessages));

export default router;
