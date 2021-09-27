import { Router } from 'express';
import {
  httpCreateConversation,
  httpGetConversations,
} from '../controllers/conversation/conversation.controllers.js';
import { errorCatcher } from '../middlewares/error.js';
import { isAuthenticated } from '../middlewares/isAuthenticated..js';

const router = Router();

router
  .route('/')
  .post(errorCatcher(isAuthenticated), errorCatcher(httpCreateConversation))
  .get(errorCatcher(isAuthenticated), errorCatcher(httpGetConversations));

export default router;
