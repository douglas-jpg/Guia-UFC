import EventRepository from '../repository/EventRepository.js';

class EventService {
    async getAllEvents() {
        return await EventRepository.getAllEvents();
    }

    async getEventById(id) {
        return await EventRepository.getEventById(id);
    }

    async createEvent(event) {
        return await EventRepository.createEvent(event);
    }

    async updateEvent(id, event) {
        return await EventRepository.updateEvent(id, event);
    }

    async deleteEvent(id) {
        return await EventRepository.deleteEvent(id);
    }
}

export default new EventService();
