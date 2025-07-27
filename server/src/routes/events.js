import express from 'express';
import EventController from '../controllers/EventController.js';

const router = express.Router();

router.get('/', EventController.getAllEvents);
router.get('/:id', EventController.getEventById);
router.post('/', EventController.createEvent);
router.put('/:id', EventController.updateEvent);
router.delete('/:id', EventController.deleteEvent);

export default router;
