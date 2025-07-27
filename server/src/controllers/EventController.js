import EventService from '../services/EventService.js';

class EventController {
    async getAllEvents(req, res) {
        try {
            const events = await EventService.getAllEvents();
            res.json(events);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEventById(req, res) {
        try {
            const event = await EventService.getEventById(req.params.id);
            if (event) {
                res.json(event);
            } else {
                res.status(404).json({ error: 'Event not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createEvent(req, res) {
        try {
            const event = await EventService.createEvent(req.body);
            res.status(201).json(event);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateEvent(req, res) {
        try {
            const event = await EventService.updateEvent(
                req.params.id,
                req.body
            );
            if (event) {
                res.json(event);
            } else {
                res.status(404).json({ error: 'Event not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteEvent(req, res) {
        try {
            await EventService.deleteEvent(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new EventController();
