import express from 'express';
const router = express.Router();
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getEvents).post(protect, admin, createEvent);
router
  .route('/:id')
  .get(protect, admin, checkObjectId, getEventById)
  .put(protect, admin, checkObjectId, updateEvent)
  .delete(protect, admin, checkObjectId, deleteEvent);

export default router;
