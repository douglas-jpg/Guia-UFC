import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

class EventRepository {
    async getAllEvents() {
        const result = await pool.query(
            'SELECT * FROM events ORDER BY date ASC'
        );
        return result.rows;
    }

    async getEventById(id) {
        const result = await pool.query('SELECT * FROM events WHERE id = $1', [
            id,
        ]);
        return result.rows[0];
    }

    async createEvent(event) {
        const { title, description, date, location } = event;
        const result = await pool.query(
            'INSERT INTO events (title, description, date, location) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, date, location]
        );
        return result.rows[0];
    }

    async updateEvent(id, event) {
        const { title, description, date, location } = event;
        const result = await pool.query(
            'UPDATE events SET title = $1, description = $2, date = $3, location = $4 WHERE id = $5 RETURNING *',
            [title, description, date, location, id]
        );
        return result.rows[0];
    }

    async deleteEvent(id) {
        await pool.query('DELETE FROM events WHERE id = $1', [id]);
    }
}

export default new EventRepository();
